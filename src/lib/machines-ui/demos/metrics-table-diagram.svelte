<script lang="ts">
	import { MetricsTableDiagram } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

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
