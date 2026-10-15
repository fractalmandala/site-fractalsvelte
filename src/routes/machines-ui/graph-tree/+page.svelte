<script lang="ts">
	import { GraphTree } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphTree
			title="REGISTRY"
			nodes={[
				{
					label: 'src/lib',
					children: [
						{
							label: 'graphs',
							children: [
								{ label: 'GraphStat.svelte', meta: 'graph' },
								{ label: 'GraphTable.svelte', meta: 'graph' }
							]
						},
						{
							label: 'frame',
							children: [{ label: 'Frame.svelte', meta: 'frame', accent: true }]
						}
					]
				}
			]}
		/>
	</Example>
</MachineDoc>
