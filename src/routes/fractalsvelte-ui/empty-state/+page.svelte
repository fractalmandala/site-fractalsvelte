<script lang="ts">
	import { EmptyState } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<EmptyState title="No items found" description="Try adjusting your search criteria or clear current filters." />
	</div>
</ComponentDoc>
