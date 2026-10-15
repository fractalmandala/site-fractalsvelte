<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		caption,
		hot = false,
		class: className = '',
		children
	}: { caption?: string; hot?: boolean; class?: string; children: Snippet } = $props();
</script>

<div class="fs-frame {hot ? 'fs-frame-hot' : ''} {className}">
	<span class="fs-corner fs-corner-tl" aria-hidden="true"></span>
	<span class="fs-corner fs-corner-tr" aria-hidden="true"></span>
	<span class="fs-corner fs-corner-bl" aria-hidden="true"></span>
	<span class="fs-corner fs-corner-br" aria-hidden="true"></span>
	{#if caption}
		<span class="fs-frame-cap">[ {caption} ]</span>
	{/if}
	{@render children()}
</div>
