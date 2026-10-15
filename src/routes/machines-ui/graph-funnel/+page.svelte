<script lang="ts">
	import { GraphFunnel } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphFunnel
			title="INSTALL"
			stage="ship"
			steps={[
				{ label: 'docs', value: 12400, display: '12,400' },
				{ label: 'copy', value: 4100, display: '4,100' },
				{ label: 'ship', value: 860, display: '860' }
			]}
		/>
	</Example>
</MachineDoc>
