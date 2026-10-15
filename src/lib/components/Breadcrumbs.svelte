<script lang="ts">
	import type { Crumb } from '#lib/seo.js';

	let { crumbs }: { crumbs: Crumb[] } = $props();
</script>

<!-- Plain spans rather than <ol>: fractalstyler has no class to zero list padding outside the rails. -->
<nav aria-label="Breadcrumb" class="row ycenter gap-xs wrap">
	{#each crumbs as crumb, i (crumb.path)}
		{#if i > 0}<span class="breadcrumb-spacer" aria-hidden="true">/</span>{/if}
		{#if i === crumbs.length - 1}
			<span class="breadcrumb-spacer" aria-current="page">{crumb.name}</span>
		{:else}
			<a href={crumb.path} class="breadcrumb-link">{crumb.name}</a>
		{/if}
	{/each}
</nav>
