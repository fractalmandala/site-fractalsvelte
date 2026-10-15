<script lang="ts">
	import { GraphHeatmap } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphHeatmap
			title="DEPLOYS"
			palette="duo"
			columns={['0', '4', '8', '12', '16', '20']}
			rows={[
				{ label: 'Mon', values: [0, 1, 4, 8, 6, 1] },
				{ label: 'Tue', values: [0, 0, 5, 9, 4, 2] },
				{ label: 'Wed', values: [1, 0, 6, 12, 5, 1] },
				{ label: 'Thu', values: [0, 2, 4, 7, 8, 3] },
				{ label: 'Fri', values: [0, 1, 3, 5, 2, 0] }
			]}
		/>
	</Example>
</MachineDoc>
