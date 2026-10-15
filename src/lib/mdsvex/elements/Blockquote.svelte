<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<blockquote class="box gap-sm bl-str pl-md">{@render children?.()}</blockquote>
