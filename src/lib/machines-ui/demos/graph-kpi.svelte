<script lang="ts">
	import { GraphKpi } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphKpi
		title="READS"
		value="12,400"
		label="this week"
		hint="+18%"
		data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
	/>
</Example>
