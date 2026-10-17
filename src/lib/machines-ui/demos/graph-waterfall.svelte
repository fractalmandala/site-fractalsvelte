<script lang="ts">
	import { GraphWaterfall } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

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
