<script lang="ts">
	import { GraphWaterfall } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphWaterfall
			title="MARGIN"
			palette="duo"
			ticks={18}
			items={[
				{ label: 'Revenue', value: 48 },
				{ label: 'Refunds', value: -6 },
				{ label: 'Hosting', value: -4 },
				{ label: 'Profit', value: 38 }
			]}
		/>
	</Example>
</MachineDoc>
