<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<ul class="fs-list-ul box gap-xs pl-lg">{@render children?.()}</ul>
