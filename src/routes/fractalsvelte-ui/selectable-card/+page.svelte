<script lang="ts">
	import { SelectableCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<SelectableCard title="Enterprise Cluster" description="High availability with 99.99% uptime guarantee." selected={true} />
	</div>
</ComponentDoc>
