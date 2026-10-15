<script lang="ts">
	import { page } from '$app/state';
	import LibraryNav from '#lib/components/LibraryNav.svelte';
	import Toc from '#lib/components/Toc.svelte';
	import type { TocEntry } from '#lib/content.js';
	import { BASE } from '#lib/machines-ui/catalog.js';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	// each page's load lists its own sections
	const toc = $derived((page.data as { toc?: TocEntry[] }).toc ?? []);
</script>

<main class="app-main">
	<aside class="sidebar-left py-xl">
		<LibraryNav title="machines-ui" base={BASE} groups={data.nav} />
	</aside>
	<section class="main-section">
		{@render children()}
	</section>
	<aside class="sidebar-right py-xl">
		{#if toc.length}
			<Toc entries={toc} />
		{/if}
	</aside>
</main>
