<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, ...rest }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<ol {...rest} class="fs-list-ol box gap-xs pl-lg">{@render children?.()}</ol>
