<script lang="ts">
	import { Pagination } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let currentPage = $state(3);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Pagination totalPages={10} bind:currentPage={currentPage} />
</ComponentDoc>
