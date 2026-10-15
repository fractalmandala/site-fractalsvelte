<script lang="ts">
	import { GraphPlot } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphPlot
			title="P95"
			data={[2, 3, 3, 5, 4, 7, 6, 8, 5, 9, 7, 6]}
			labels={['jan', 'dec']}
		/>
	</Example>
	<Example>
		<GraphPlot
			title="ERRORS"
			variant="line"
			height={5}
			progress={0.7}
			data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
			labels={['mon', 'fri']}
		/>
	</Example>
</MachineDoc>
