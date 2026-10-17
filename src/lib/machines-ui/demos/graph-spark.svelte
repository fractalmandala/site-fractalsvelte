<script lang="ts">
	import { GraphSpark } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphSpark
		title="LATENCY"
		data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]}
		caption="last point is the accent"
	/>
</Example>
