<script lang="ts">

	import '#lib/styles/index.sass';
	import Seo from '#lib/components/Seo.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children } = $props();

</script>

<Seo />

<div class="app-shell">
<SiteHeader />
	{@render children()}
<SiteFooter />
</div>

