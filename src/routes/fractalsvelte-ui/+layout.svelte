<script lang="ts">
	import '@fractaldesign/fractalsvelte-ui/tokens.css';
	import LibraryShell from '#lib/docs/LibraryShell.svelte';
	import ThemeBridge from '#lib/fractalsvelte-ui/ThemeBridge.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<ThemeBridge />
<LibraryShell {data}>{@render children()}</LibraryShell>
