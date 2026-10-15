<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<code class="bg-sunken radius-xs px-xs text-md text-primary">{@render children?.()}</code>
