<script lang="ts">
	import { GraphKpi } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphKpi
			title="READS"
			value="12,400"
			label="this week"
			hint="+18%"
			data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
		/>
	</Example>
</MachineDoc>
