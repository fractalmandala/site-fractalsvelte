<script lang="ts">
	import { MetricsTableDiagram } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<MetricsTableDiagram
			title="COST"
			rows={[
				{ label: 'AST parse', calls: 120, time: '16m' },
				{ label: 'MDsveX compile', calls: 164, time: '16m' },
				{ label: 'Rune optimization', calls: 112, time: '18m' }
			]}
			totalCalls={396}
			totalTime="~50m"
		/>
	</Example>
</MachineDoc>
