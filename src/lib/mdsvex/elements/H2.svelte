<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, ...rest }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<h2 {...rest} class="page-heading-xl text-primary pt-xl">{@render children?.()}</h2>
