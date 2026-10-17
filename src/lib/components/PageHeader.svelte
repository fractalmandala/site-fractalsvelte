<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		lede,
		children
	}: {
		eyebrow: string;
		title?: string;
		lede?: string;
		children?: Snippet;
	} = $props();
</script>

<header class="box gap-md">
	<p class="fs-eyebrow text-body-sm weight-600 text-theme">{eyebrow}</p>
	<h1 class="text-4xl weight-800 ls-tight-xl lh11 text-primary">
		{title}
	</h1>
	{#if lede}
		<p class="text-body-lg text-secondary lh15">{lede}</p>
	{/if}
	{@render children?.()}
</header>
