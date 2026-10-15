<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, ...rest }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<h4 {...rest} class="page-heading-bs text-primary pt-md">{@render children?.()}</h4>
