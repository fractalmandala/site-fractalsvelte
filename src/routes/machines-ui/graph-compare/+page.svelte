<script lang="ts">
	import { GraphCompare } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphCompare
			title="PLANS"
			columns={['Solo', 'Studio']}
			accent="Studio"
			rows={[
				{ label: 'Registry', values: [true, true] },
				{ label: 'Accent picker', values: [true, true] },
				{ label: 'Private source', values: [false, true] },
				{ label: 'Price', values: ['$0', '$24'] }
			]}
		/>
	</Example>
</MachineDoc>
