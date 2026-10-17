<script lang="ts">
	import '@fractaldesign/machines-ui/style.css';
	import LibraryShell from '#lib/docs/LibraryShell.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<LibraryShell {data}>{@render children()}</LibraryShell>
