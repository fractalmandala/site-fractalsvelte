<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<p class="text-body text-secondary lh16">{@render children?.()}</p>
