<script lang="ts">

	import '#lib/styles/index.sass';
	import { modeScript } from '#lib/mode/mode.svelte.js'
	import Seo from '#lib/components/Seo.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';

	let { children } = $props();

</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script>${modeScript()}<\x2fscript>`}
</svelte:head>

<Seo />

<div class="app-shell">
<SiteHeader />
<main class="app-main">
	{@render children()}
</main>
<SiteFooter />
</div>

