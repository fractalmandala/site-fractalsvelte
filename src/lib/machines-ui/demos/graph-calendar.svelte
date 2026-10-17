<script lang="ts">
	import { GraphCalendar } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphCalendar year={2026} month={8} today={27} marks={[12, 18, 27]} />
</Example>
