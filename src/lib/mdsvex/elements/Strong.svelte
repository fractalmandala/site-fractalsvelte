<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<strong class="weight-600 text-primary">{@render children?.()}</strong>
