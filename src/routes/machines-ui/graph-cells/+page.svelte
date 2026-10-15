<script lang="ts">
	import { GraphCells } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphCells
			title="TWO WAYS TO LEARN"
			items={[
				{
					label: 'fragments',
					cells: [
						[1, 0, 1, 0, 0],
						[0, 1, 0, 1, 0],
						[1, 0, 0, 0, 1]
					]
				},
				{
					label: 'a system',
					cells: [
						[1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1]
					]
				}
			]}
		/>
	</Example>
</MachineDoc>
