<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		eyebrow,
		title,
		center = false,
		children
	}: {
		id?: string;
		eyebrow: string;
		title: string;
		center?: boolean;
		children?: Snippet;
	} = $props();
</script>

<header class="box gap-sm {center ? 'xcenter' : ''}">
	<p class="fs-eyebrow text-sm weight-600 text-theme">{eyebrow}</p>
	<h2 {id} class="text-3xl weight-800 ls-tight-xl lh11 text-primary">{title}</h2>
	{#if children}
		<p class="text-body-lg text-secondary lh15">{@render children()}</p>
	{/if}
</header>
