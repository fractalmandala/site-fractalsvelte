<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, ...rest }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<h3 {...rest} class="page-heading-lg text-primary pt-lg">{@render children?.()}</h3>
