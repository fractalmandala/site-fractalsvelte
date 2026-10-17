<script lang="ts">
	import { GraphHeatmap } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

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
