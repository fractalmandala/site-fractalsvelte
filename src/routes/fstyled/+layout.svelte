<script lang="ts">
	import LibraryShell from '#lib/docs/LibraryShell.svelte';
	// import the package's stylesheet here, once, when it needs one
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<LibraryShell {data}>{@render children()}</LibraryShell>
