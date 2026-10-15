<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, align }: { children?: Snippet; align?: string } = $props();
</script>

<td
	class="px-md py-sm bb-sub text-secondary {align === 'right'
		? 'ta-r'
		: align === 'center'
			? 'ta-c'
			: 'ta-l'}">{@render children?.()}</td
>
