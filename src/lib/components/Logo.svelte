<script lang="ts">
	import logotypeDark from '#lib/assets/brand/logotype-dark.png';
	import logotypeLight from '#lib/assets/brand/logotype-light.png';
	import MascotGL from './mascot/MascotGL.svelte';

	// The moving mascot plus the script logotype; each logotype image matches one colour mode.
	let { href = '/' }: { href?: string } = $props();
</script>

<a {href} class="row ycenter gap-sm shrink-0" aria-label="fractalsvelte home">
	<MascotGL
		class="site-logomotif"
		size={32}
		compact
		tilt={16}
		shadow={0.6}
		alt="fractalsvelte mascot"
	/>
	<img
		class="logotype fs-only-light"
		src={logotypeLight}
		width="138"
		height="28"
		alt="fractalsvelte"
	/>
	<img
		class="logotype fs-only-dark"
		src={logotypeDark}
		width="138"
		height="28"
		alt="fractalsvelte"
	/>
</a>
