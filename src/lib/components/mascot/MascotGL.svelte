<script lang="ts">
	/**
	 * MascotGL: WebGL2 version of the mascot (the site header, compact mode).
	 *
	 * The 2D art is turned into a heightfield (sphere-ish body dome, antenna tube,
	 * raised eye domes, embossed line patterns, inset mouth; see the maps in
	 * src/lib/assets/mascot/gl). The fragment shader ray-marches that heightfield
	 * from a camera that orbits toward the pointer, so silhouettes and
	 * occlusion really change (not just a flat tilt). Pupils are drawn in-shader
	 * on a virtual eyeball sphere (foreshortening near the rim) and their
	 * highlights are the reflection of the light, so they stay fixed to it.
	 *
	 * Modes: `lit` (Blinn-Phong spec, rim, warm edge glow, AO, shadow) or
	 * `parallax` (same geometry, art colours only).
	 *
	 * Fallbacks: the CSS <Mascot> renders for SSR, while textures load, when
	 * WebGL2 is unavailable or the context is lost, and under
	 * prefers-reduced-motion. The rAF loop stops when the tab is hidden or the
	 * canvas is offscreen.
	 *
	 * Cost control: `lazy` (default) defers context creation, shader compile and
	 * map downloads to an idle callback after first paint. Sizes <= 128px use the
	 * 256px map set (~100KB) and 32 ray steps; larger sizes use the 1024 set.
	 * `compact` shrinks the canvas overhang (130% instead of 160%) for tight
	 * layouts like the header; the layout box is always exactly `size`.
	 */
	import Mascot from './Mascot.svelte';
	import { VERT, FRAG } from './shaders.js';
	import albedo1024 from '#lib/assets/mascot/mascot-base-1024.webp';
	import normal1024 from '#lib/assets/mascot/gl/mascot-normal.webp';
	import data1024 from '#lib/assets/mascot/gl/mascot-data.webp';
	import albedo256 from '#lib/assets/mascot/gl/mascot-albedo-256.webp';
	import normal256 from '#lib/assets/mascot/gl/mascot-normal-256.webp';
	import data256 from '#lib/assets/mascot/gl/mascot-data-256.webp';

	interface Props {
		/** Mascot width/height in CSS px (the canvas overhangs by 30% per side for shadow/tilt). */
		size?: number;
		mode?: 'lit' | 'parallax';
		/** Max orbit toward the pointer, degrees. */
		tilt?: number;
		blink?: boolean;
		bob?: boolean;
		alt?: string;
		/** Smaller canvas overhang for tight layouts (header). */
		compact?: boolean;
		/** Defer GL setup + map downloads until the browser is idle. */
		lazy?: boolean;
		/** Drop shadow strength, 0..1+. */
		shadow?: number;
		class?: string;
	}

	let {
		size = 32,
		mode = 'lit',
		tilt = 24,
		blink = true,
		bob = true,
		alt = 'Fractalsvelte mascot (3D)',
		compact = false,
		lazy = true,
		shadow = 1,
		class: className = ''
	}: Props = $props();

	/** Canvas half-extent in world units (1 = mascot width). Matches 160% / 130% (compact) in sass. */
	const EXTENT_FULL = 0.8;
	const EXTENT_COMPACT = 0.65;
	/** Height of the tallest point in world units (from the depth bake). */
	const HMAX = 0.2458;
	const EYES = [
		{ x: 302.5 / 1024 - 0.5, y: 0.5 - 611 / 1024 },
		{ x: 718 / 1024 - 0.5, y: 0.5 - 611 / 1024 }
	];
	const LIDS = [
		[253 / 255, 69 / 255, 2 / 255],
		[253 / 255, 119 / 255, 1 / 255]
	];
	// Light at rest reproduces the art's highlight placement (upper right).
	const L0 = [0.392, 0.398, 0.828];

	let mounted = $state(false);
	let reduced = $state(false);
	let failed = $state(false);
	let ready = $state(false);
	let idle = $state(false);
	let canvas: HTMLCanvasElement | undefined = $state();

	const useGL = $derived(mounted && idle && !reduced && !failed);

	// Non-reactive mirrors read by the render loop (no GL rebuild on change).
	let cfg = { lit: 1, tilt: 24, blink: true, bob: true, shadow: 1 };
	$effect(() => {
		cfg = { lit: mode === 'lit' ? 1 : 0, tilt, blink, bob, shadow };
	});

	$effect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduced = mq.matches;
		if (!('WebGL2RenderingContext' in window)) failed = true;
		mounted = true;
		let idleId = 0;
		let timer = 0;
		if (!lazy) idle = true;
		else if (typeof requestIdleCallback === 'function')
			idleId = requestIdleCallback(() => (idle = true), { timeout: 2500 });
		else timer = setTimeout(() => (idle = true), 400) as unknown as number;
		const onChange = (e: MediaQueryListEvent) => (reduced = e.matches);
		mq.addEventListener('change', onChange);
		return () => {
			mq.removeEventListener('change', onChange);
			if (idleId) cancelIdleCallback(idleId);
			if (timer) clearTimeout(timer);
		};
	});

	async function loadBitmap(url: string, data: boolean): Promise<ImageBitmap> {
		const blob = await (await fetch(url)).blob();
		return createImageBitmap(blob, {
			premultiplyAlpha: 'none',
			colorSpaceConversion: data ? 'none' : 'default'
		});
	}

	function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
		const sh = gl.createShader(type)!;
		gl.shaderSource(sh, src);
		gl.compileShader(sh);
		if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
			const log = gl.getShaderInfoLog(sh);
			gl.deleteShader(sh);
			throw new Error(`MascotGL shader: ${log}`);
		}
		return sh;
	}

	$effect(() => {
		const cv = canvas;
		if (!cv) return;
		const small = size <= 128;
		const EXTENT = compact ? EXTENT_COMPACT : EXTENT_FULL;
		const MAP = small ? 256 : 1024;
		const urls = small ? [albedo256, normal256, data256] : [albedo1024, normal1024, data1024];
		const gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
		if (!gl) {
			failed = true;
			return;
		}

		let disposed = false;
		let raf = 0;
		let visible = true;
		let last = 0;
		let nextBlink = performance.now() + 2500;
		let blinkStart = -1;
		const t0 = performance.now();

		// eased state: yaw, pitch, light x, light y, cursor world x, y, engaged (0..1)
		const cur = [0, 0, 0, 0, 0, 0, 0];
		const tgt = [0, 0, 0, 0, 0, 0, 0];
		let pointer: { x: number; y: number } | null = null;

		const vs = compile(gl, gl.VERTEX_SHADER, VERT);
		const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
		const prog = gl.createProgram()!;
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.bindAttribLocation(prog, 0, 'a_pos');
		gl.linkProgram(prog);
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			console.error('MascotGL link:', gl.getProgramInfoLog(prog));
			failed = true;
			return;
		}
		gl.useProgram(prog);
		const vao = gl.createVertexArray();
		gl.bindVertexArray(vao);
		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		const U = (name: string) => gl.getUniformLocation(prog, name);
		const u = {
			extent: U('u_extent'),
			rot: U('u_rot'),
			offset: U('u_offset'),
			light: U('u_light'),
			gaze: U('u_gaze'),
			lid: U('u_lid'),
			blink: U('u_blink'),
			lit: U('u_lit'),
			hmax: U('u_hmax'),
			px: U('u_px'),
			lod: U('u_lod'),
			steps: U('u_steps'),
			shadow: U('u_shadow')
		};
		gl.uniform1i(u.steps, small ? 32 : 96);
		gl.uniform1f(u.extent, EXTENT);
		gl.uniform1f(u.hmax, HMAX);
		gl.uniform3fv(u.lid, new Float32Array(LIDS.flat()));
		['u_albedo', 'u_normal', 'u_data'].forEach((n, i) => gl.uniform1i(U(n), i));
		const textures: WebGLTexture[] = [];

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = Math.max(1, Math.round(cv!.clientWidth * dpr));
			const h = Math.max(1, Math.round(cv!.clientHeight * dpr));
			if (cv!.width !== w || cv!.height !== h) {
				cv!.width = w;
				cv!.height = h;
			}
			gl!.viewport(0, 0, w, h);
			const px = (2 * EXTENT) / w;
			gl!.uniform1f(u.px, px);
			gl!.uniform1f(u.lod, Math.max(0, Math.log2(MAP * px)));
		}

		function computeTargets() {
			if (!pointer) {
				for (let i = 0; i < 4; i++) tgt[i] = 0;
				tgt[6] = 0;
				return;
			}
			const rect = cv!.getBoundingClientRect();
			if (!rect.width) return;
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const nx = Math.max(-1, Math.min(1, (pointer.x - cx) / (window.innerWidth / 2)));
			const ny = Math.max(-1, Math.min(1, (pointer.y - cy) / (window.innerHeight / 2)));
			const unit = rect.width / (2 * EXTENT); // CSS px per world unit
			tgt[0] = nx;
			tgt[1] = ny;
			tgt[2] = nx;
			tgt[3] = -ny;
			tgt[4] = (pointer.x - cx) / unit;
			tgt[5] = -(pointer.y - cy) / unit;
			tgt[6] = 1;
		}

		function frame(now: number) {
			raf = 0;
			if (disposed) return;
			const dt = last ? Math.min(64, now - last) : 16.7;
			last = now;
			const k = 1 - Math.pow(1 - 0.12, dt / 16.7);
			for (let i = 0; i < cur.length; i++) cur[i] += (tgt[i] - cur[i]) * k;

			const maxA = (cfg.tilt * Math.PI) / 180;
			const a = cur[0] * maxA; // yaw: features move toward the pointer
			const b = cur[1] * maxA; // pitch
			const ca = Math.cos(a),
				sa = Math.sin(a),
				cb = Math.cos(b),
				sb = Math.sin(b);
			// R = rotY(a) * rotX(b), column-major
			gl!.uniformMatrix3fv(
				u.rot,
				false,
				new Float32Array([ca, 0, -sa, sa * sb, cb, ca * sb, sa * cb, -sb, ca * cb])
			);
			const time = (now - t0) / 1000;
			const bobY = cfg.bob ? 0.012 * Math.sin((time * Math.PI * 2) / 3.6) : 0;
			gl!.uniform2f(u.offset, 0, bobY);

			const lx = L0[0] + cur[2] * 0.95;
			const ly = L0[1] + cur[3] * 0.95;
			const ll = Math.hypot(lx, ly, L0[2]);
			gl!.uniform3f(u.light, lx / ll, ly / ll, L0[2] / ll);

			const gaze = new Float32Array(6);
			EYES.forEach((e, i) => {
				const dx = cur[4] - e.x;
				const dy = cur[5] - (e.y + bobY);
				const l = Math.hypot(dx, dy, 0.7);
				// blend from straight ahead (no pointer) to looking at the pointer
				const gx = (dx / l) * cur[6];
				const gy = (dy / l) * cur[6];
				const gz = 1 - cur[6] + (0.7 / l) * cur[6];
				const gl2 = Math.hypot(gx, gy, gz);
				gaze.set([gx / gl2, gy / gl2, gz / gl2], i * 3);
			});
			gl!.uniform3fv(u.gaze, gaze);

			let bl = 0;
			if (cfg.blink) {
				if (blinkStart < 0 && now >= nextBlink) blinkStart = now;
				if (blinkStart >= 0) {
					const p = (now - blinkStart) / 170;
					if (p >= 1) {
						blinkStart = -1;
						nextBlink = now + 2800 + Math.random() * 3200;
					} else bl = Math.sin(p * Math.PI);
				}
			}
			gl!.uniform1f(u.blink, bl);
			gl!.uniform1f(u.lit, cfg.lit);
			gl!.uniform1f(u.shadow, cfg.shadow);

			gl!.clearColor(0, 0, 0, 0);
			gl!.clear(gl!.COLOR_BUFFER_BIT);
			gl!.drawArrays(gl!.TRIANGLES, 0, 3);
			if (!ready) ready = true;
			schedule();
		}

		function schedule() {
			if (!raf && !disposed && visible && !document.hidden && textures.length === 3) {
				raf = requestAnimationFrame(frame);
			}
		}
		function stop() {
			if (raf) cancelAnimationFrame(raf);
			raf = 0;
			last = 0;
		}

		Promise.all([loadBitmap(urls[0], false), loadBitmap(urls[1], true), loadBitmap(urls[2], true)])
			.then((bitmaps) => {
				if (disposed) return bitmaps.forEach((b) => b.close());
				gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
				gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
				bitmaps.forEach((bmp, i) => {
					const tex = gl.createTexture()!;
					gl.activeTexture(gl.TEXTURE0 + i);
					gl.bindTexture(gl.TEXTURE_2D, tex);
					gl.texImage2D(
						gl.TEXTURE_2D,
						0,
						i === 0 ? gl.RGBA8 : gl.RGB8,
						i === 0 ? gl.RGBA : gl.RGB,
						gl.UNSIGNED_BYTE,
						bmp
					);
					gl.generateMipmap(gl.TEXTURE_2D);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					bmp.close();
					textures.push(tex);
				});
				resize();
				schedule();
			})
			.catch((err) => {
				console.error('MascotGL textures:', err);
				failed = true;
			});

		const onPointer = (e: PointerEvent) => {
			pointer = { x: e.clientX, y: e.clientY };
			computeTargets();
		};
		const onTouch = (e: TouchEvent) => {
			const t = e.touches[0];
			if (!t) return;
			pointer = { x: t.clientX, y: t.clientY };
			computeTargets();
		};
		const onRelease = () => {
			pointer = null;
			computeTargets();
		};
		const onDocLeave = (e: MouseEvent) => {
			if (!e.relatedTarget) onRelease();
		};
		const onScroll = () => computeTargets();
		const onVisibility = () => (document.hidden ? stop() : schedule());
		const onLost = (e: Event) => {
			e.preventDefault();
			stop();
			failed = true;
		};

		const ro = new ResizeObserver(() => resize());
		ro.observe(cv);
		const io = new IntersectionObserver((entries) => {
			visible = entries.some((en) => en.isIntersecting);
			if (visible) schedule();
			else stop();
		});
		io.observe(cv);

		const passive = { passive: true } as const;
		window.addEventListener('pointermove', onPointer, passive);
		window.addEventListener('pointerdown', onPointer, passive);
		window.addEventListener('touchstart', onTouch, passive);
		window.addEventListener('touchmove', onTouch, passive);
		window.addEventListener('touchend', onRelease, passive);
		window.addEventListener('touchcancel', onRelease, passive);
		window.addEventListener('blur', onRelease);
		window.addEventListener('scroll', onScroll, passive);
		document.addEventListener('mouseout', onDocLeave);
		document.addEventListener('visibilitychange', onVisibility);
		cv.addEventListener('webglcontextlost', onLost);

		return () => {
			disposed = true;
			stop();
			ro.disconnect();
			io.disconnect();
			window.removeEventListener('pointermove', onPointer);
			window.removeEventListener('pointerdown', onPointer);
			window.removeEventListener('touchstart', onTouch);
			window.removeEventListener('touchmove', onTouch);
			window.removeEventListener('touchend', onRelease);
			window.removeEventListener('touchcancel', onRelease);
			window.removeEventListener('blur', onRelease);
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('mouseout', onDocLeave);
			document.removeEventListener('visibilitychange', onVisibility);
			cv.removeEventListener('webglcontextlost', onLost);
			if (!gl.isContextLost()) {
				textures.forEach((t) => gl.deleteTexture(t));
				gl.deleteBuffer(buf);
				gl.deleteVertexArray(vao);
				gl.deleteProgram(prog);
				gl.deleteShader(vs);
				gl.deleteShader(fs);
			}
			ready = false;
		};
	});
</script>

<span class="mascotgl {className}" class:mascotgl-compact={compact}>
	{#if useGL && ready}
		<svg class="mascotgl-spacer" width=32 height=32 role="img" aria-label={alt}></svg>
	{:else}
		<Mascot {size} {alt} />
	{/if}
	{#if useGL}
		<canvas
			bind:this={canvas}
			class="mascotgl-canvas"
			class:mascotgl-ready={ready}
			aria-hidden="true"
		></canvas>
	{/if}
</span>
