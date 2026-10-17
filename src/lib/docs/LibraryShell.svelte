<script lang="ts">
	// The shell every doc set shares: left rail, main column, right-rail TOC.
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import LibraryNav from '#lib/components/LibraryNav.svelte';
	import Toc from '#lib/components/Toc.svelte';
	import type { TocEntry } from '#lib/content.js';
	import type { SetLayoutData } from '#lib/server/docs/load.js';

	let { data, children }: { data: SetLayoutData; children: Snippet } = $props();

	const toc = $derived((page.data as { toc?: TocEntry[] }).toc ?? []);
</script>

	<aside class="sidebar-left py-xl">
		<LibraryNav title={data.set.title} base={data.set.base} groups={data.nav} />
	</aside>
	<section class="main-section">
		{@render children()}
	</section>
	<aside class="sidebar-right py-xl">
		{#if toc.length}
			<Toc entries={toc} />
		{/if}
	</aside>
