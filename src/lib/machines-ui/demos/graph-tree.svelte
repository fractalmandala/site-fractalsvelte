<script lang="ts">
	import { GraphTree } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

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
