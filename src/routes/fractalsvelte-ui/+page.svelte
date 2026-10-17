<script lang="ts">

	import LibraryIndex from '#lib/docs/LibraryIndex.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<LibraryIndex {data} />
