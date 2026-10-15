<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<div class="scroll-x border radius-sm">
	<table class="wfull text-md">{@render children?.()}</table>
</div>
