<script lang="ts">
	import type { Snippet } from 'svelte';
	import DocsNav from './DocsNav.svelte';
	import Toc from './Toc.svelte';
	import type { TocEntry } from '#lib/content.js';

	let { toc, children }: { toc: TocEntry[]; children: Snippet } = $props();
</script>

<div class="app-main grow gap-2xl">
	<aside class="sidebar-left py-xl">
		<DocsNav />
	</aside>

	<main class="main-section py-xl">
		<div class="prose">
			<div class="box gap-3xl">
				{@render children()}
			</div>
		</div>
	</main>

	<aside class="sidebar-right py-xl">
		{#if toc.length}
			<Toc entries={toc} />
		{/if}
	</aside>
</div>
