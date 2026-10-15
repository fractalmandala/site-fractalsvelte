<script lang="ts">
	/**
	 * Mascot: a light, CSS-only "3D feel" version of the orange blob logo.
	 *
	 * Layers (all inside a `perspective` wrapper):
	 * - `.mascot-bob`: subtle idle bob (CSS animation).
	 * - `.mascot-tilt`: rotateX/rotateY toward the pointer (max `tilt` deg).
	 *   - base image: the mascot with its pupils painted out (plain sclera).
	 *   - SVG overlay (1024×1024 image space): two pupils + highlights that
	 *     follow the pointer, eyelids for the blink, and a moving gloss/shade
	 *     clipped to the mascot's silhouette.
	 *
	 * JS only writes CSS custom properties on the root (`--mascot-*`); every
	 * transform lives in `_08_own.sass`. The rAF loop runs only while values
	 * are still easing toward their targets, never while the tab is hidden.
	 *
	 * prefers-reduced-motion: no bob, no blink, no tilt, static gloss. Eyes
	 * still look at the pointer, but snap directly (no rAF easing).
	 *
	 * Eye geometry was measured from the 1024px source art (og/brand/mascot.png).
	 */
	import base96 from '#lib/assets/mascot/mascot-base-96.webp';
	import base192 from '#lib/assets/mascot/mascot-base-192.webp';
	import base512 from '#lib/assets/mascot/mascot-base-512.webp';
	import base1024 from '#lib/assets/mascot/mascot-base-1024.webp';

	interface Props {
		/** Rendered width/height in CSS px. */
		size?: number;
		/** Override the base (pupil-less) image. Must share the 1024 art geometry. */
		src?: string;
		/** Override srcset. Defaults to the bundled webp set unless `src` is overridden. */
		srcset?: string;
		alt?: string;
		/** Max tilt toward the pointer in degrees. 0 disables tilt. */
		tilt?: number;
		blink?: boolean;
		bob?: boolean;
		class?: string;
	}

	let {
		size = 48,
		src,
		srcset,
		alt = 'Fractalsvelte mascot',
		tilt = 12,
		blink = true,
		bob = true,
		class: className = ''
	}: Props = $props();

	const uid = $props.id();

	// Art colors sampled from the source PNG (art data, not theme tokens).
	const PUPIL = '#01010f';
	const HIGHLIGHT = '#fdfdfd';

	// Measured in 1024px image coordinates. `c*` / `r` = sclera (inside the dark
	// ring), `p*` / `pr` = pupil at rest, `hl` = highlight offsets from pupil.
	const EYES = [
		{
			key: 'l',
			cx: 302.5,
			cy: 611,
			r: 113.3,
			px: 302.2,
			py: 609.9,
			pr: 78.4,
			lid: '#fd4502',
			hl: [
				{ dx: 30.8, dy: -31.2, r: 31.4 },
				{ dx: -34, dy: 35.3, r: 23.2 }
			]
		},
		{
			key: 'r',
			cx: 718,
			cy: 611,
			r: 113.7,
			px: 718.2,
			py: 609.9,
			pr: 78.4,
			lid: '#fd7701',
			hl: [
				{ dx: 30.6, dy: -31.3, r: 31.4 },
				{ dx: -33.7, dy: 35.2, r: 23.2 }
			]
		}
	] as const;

	/** Max pupil travel from rest, image px (sclera r − pupil r ≈ 35, keep a rim). */
	const MAX_TRAVEL = 29;
	const GLOSS_REST = { x: 400, y: 400 };

	const imgSrc = $derived(
		src ??
			(size * 2 <= 96 ? base96 : size * 2 <= 192 ? base192 : size * 2 <= 512 ? base512 : base1024)
	);
	const imgSrcset = $derived(
		srcset ??
			(src ? undefined : `${base96} 96w, ${base192} 192w, ${base512} 512w, ${base1024} 1024w`)
	);

	let root: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const el = root;
		if (!el) return;
		const maxTilt = tilt;
		el.style.setProperty('--mascot-persp', `${Math.max(240, size * 5)}px`);

		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		let reduced = mq.matches;

		// [rx, ry, gx, gy, plx, ply, prx, pry]
		const rest = [0, 0, GLOSS_REST.x, GLOSS_REST.y, 0, 0, 0, 0];
		const cur = rest.slice();
		const tgt = rest.slice();
		let pointer: { x: number; y: number } | null = null;
		let raf = 0;
		let last = 0;

		const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

		function apply() {
			const s = el!.style;
			s.setProperty('--mascot-rx', `${cur[0].toFixed(2)}deg`);
			s.setProperty('--mascot-ry', `${cur[1].toFixed(2)}deg`);
			s.setProperty('--mascot-gx', cur[2].toFixed(1));
			s.setProperty('--mascot-gy', cur[3].toFixed(1));
			s.setProperty('--mascot-plx', cur[4].toFixed(2));
			s.setProperty('--mascot-ply', cur[5].toFixed(2));
			s.setProperty('--mascot-prx', cur[6].toFixed(2));
			s.setProperty('--mascot-pry', cur[7].toFixed(2));
		}

		function computeTargets() {
			if (!pointer) {
				for (let i = 0; i < rest.length; i++) tgt[i] = rest[i];
				return;
			}
			// Root is never transformed (bob/tilt live on children) so its rect is stable.
			const rect = el!.getBoundingClientRect();
			if (!rect.width) return;
			const scale = rect.width / 1024;
			const nx = clamp((pointer.x - (rect.left + rect.width / 2)) / (window.innerWidth / 2), -1, 1);
			const ny = clamp(
				(pointer.y - (rect.top + rect.height / 2)) / (window.innerHeight / 2),
				-1,
				1
			);

			const t = reduced ? 0 : maxTilt;
			tgt[0] = -ny * t;
			tgt[1] = nx * t;
			tgt[2] = reduced ? GLOSS_REST.x : 512 + nx * 300;
			tgt[3] = reduced ? GLOSS_REST.y : 560 + ny * 300;

			// Each eye aims at the pointer on its own (slight convergence up close).
			const reach = Math.max(rect.width * 1.5, 160);
			EYES.forEach((eye, i) => {
				const dx = pointer!.x - (rect.left + eye.px * scale);
				const dy = pointer!.y - (rect.top + eye.py * scale);
				const dist = Math.hypot(dx, dy);
				const mag = dist < 0.5 ? 0 : (MAX_TRAVEL * Math.min(1, dist / reach)) / dist;
				tgt[4 + i * 2] = dx * mag;
				tgt[5 + i * 2] = dy * mag;
			});
		}

		function tick(now: number) {
			raf = 0;
			const dt = last ? Math.min(64, now - last) : 16.7;
			last = now;
			const k = 1 - Math.pow(1 - 0.16, dt / 16.7);
			let moving = false;
			for (let i = 0; i < cur.length; i++) {
				const d = tgt[i] - cur[i];
				if (Math.abs(d) > 0.02) {
					cur[i] += d * k;
					moving = true;
				} else cur[i] = tgt[i];
			}
			apply();
			if (moving && !document.hidden) raf = requestAnimationFrame(tick);
			else last = 0;
		}

		function kick() {
			computeTargets();
			if (reduced) {
				if (raf) cancelAnimationFrame(raf);
				raf = 0;
				for (let i = 0; i < cur.length; i++) cur[i] = tgt[i];
				apply();
				return;
			}
			if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
		}

		const onPointer = (e: PointerEvent) => {
			pointer = { x: e.clientX, y: e.clientY };
			kick();
		};
		const onTouch = (e: TouchEvent) => {
			const t = e.touches[0];
			if (!t) return;
			pointer = { x: t.clientX, y: t.clientY };
			kick();
		};
		const onRelease = () => {
			pointer = null;
			kick();
		};
		const onDocLeave = (e: MouseEvent) => {
			if (!e.relatedTarget) onRelease();
		};
		const onScroll = () => {
			if (pointer) kick();
		};
		const onVisibility = () => {
			if (document.hidden) {
				if (raf) cancelAnimationFrame(raf);
				raf = 0;
				last = 0;
			} else kick();
		};
		const onMotionPref = (e: MediaQueryListEvent) => {
			reduced = e.matches;
			kick();
		};

		const passive = { passive: true } as const;
		window.addEventListener('pointermove', onPointer, passive);
		window.addEventListener('pointerdown', onPointer, passive);
		window.addEventListener('touchstart', onTouch, passive);
		window.addEventListener('touchmove', onTouch, passive);
		window.addEventListener('touchend', onRelease, passive);
		window.addEventListener('touchcancel', onRelease, passive);
		window.addEventListener('blur', onRelease);
		window.addEventListener('scroll', onScroll, passive);
		window.addEventListener('resize', onScroll, passive);
		document.addEventListener('mouseout', onDocLeave);
		document.addEventListener('visibilitychange', onVisibility);
		mq.addEventListener('change', onMotionPref);
		apply();

		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', onPointer);
			window.removeEventListener('pointerdown', onPointer);
			window.removeEventListener('touchstart', onTouch);
			window.removeEventListener('touchmove', onTouch);
			window.removeEventListener('touchend', onRelease);
			window.removeEventListener('touchcancel', onRelease);
			window.removeEventListener('blur', onRelease);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			document.removeEventListener('mouseout', onDocLeave);
			document.removeEventListener('visibilitychange', onVisibility);
			mq.removeEventListener('change', onMotionPref);
		};
	});
</script>

<span
	bind:this={root}
	class="mascot {className}"
	class:mascot-blinks={blink}
	class:mascot-bobs={bob}
>
	<span class="mascot-bob">
		<span class="mascot-tilt">
			<img
				class="mascot-base"
				src={imgSrc}
				srcset={imgSrcset}
				sizes="{size}px"
				width={size}
				height={size}
				{alt}
				draggable="false"
				decoding="async"
			/>
			<svg
				class="mascot-overlay"
				viewBox="0 0 1024 1024"
				width={size}
				height={size}
				aria-hidden="true"
				focusable="false"
			>
				<defs>
					{#each EYES as eye (eye.key)}
						<clipPath id="{uid}-eye-{eye.key}">
							<circle cx={eye.cx} cy={eye.cy} r={eye.r + 1} />
						</clipPath>
					{/each}
					<radialGradient id="{uid}-gloss">
						<stop offset="0" stop-color="#ffffff" stop-opacity="0.9" />
						<stop offset="0.4" stop-color="#ffffff" stop-opacity="0.3" />
						<stop offset="1" stop-color="#ffffff" stop-opacity="0" />
					</radialGradient>
					<radialGradient id="{uid}-shade">
						<stop offset="0" stop-color="#2a0a00" stop-opacity="0.5" />
						<stop offset="1" stop-color="#2a0a00" stop-opacity="0" />
					</radialGradient>
					<mask id="{uid}-silhouette" class="mascot-mask">
						<image href={imgSrc} width="1024" height="1024" />
					</mask>
				</defs>

				{#each EYES as eye (eye.key)}
					<g clip-path="url(#{uid}-eye-{eye.key})">
						<g class={eye.key === 'l' ? 'mascot-pupil-l' : 'mascot-pupil-r'}>
							<circle cx={eye.px} cy={eye.py} r={eye.pr} fill={PUPIL} />
							{#each eye.hl as h, i (i)}
								<circle cx={eye.px + h.dx} cy={eye.py + h.dy} r={h.r} fill={HIGHLIGHT} />
							{/each}
						</g>
						<g class="mascot-lid">
							<rect
								x={eye.cx - eye.r - 2}
								y={eye.cy - eye.r * 3 - 4}
								width={eye.r * 2 + 4}
								height={eye.r * 2}
								fill={eye.lid}
							/>
							<rect
								x={eye.cx - eye.r - 2}
								y={eye.cy - eye.r - 16}
								width={eye.r * 2 + 4}
								height="12"
								fill={PUPIL}
							/>
						</g>
					</g>
				{/each}

				<g mask="url(#{uid}-silhouette)">
					<circle class="mascot-shade" r="520" fill="url(#{uid}-shade)" />
					<circle class="mascot-gloss" r="360" fill="url(#{uid}-gloss)" />
				</g>
			</svg>
		</span>
	</span>
</span>
