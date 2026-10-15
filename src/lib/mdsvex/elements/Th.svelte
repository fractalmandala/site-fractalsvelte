<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, align }: { children?: Snippet; align?: string } = $props();
</script>

<th
	class="px-md py-sm bb text-primary weight-600 {align === 'right'
		? 'ta-r'
		: align === 'center'
			? 'ta-c'
			: 'ta-l'}">{@render children?.()}</th
>
