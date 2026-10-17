<script lang="ts">
	import { GraphUptime } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';

	const uptimeDays = Array.from({ length: 90 }, (_, index) =>
		index === 41 || index === 42
			? 'down'
			: index === 18 || index === 60 || index === 61
				? 'degraded'
				: 'ok'
	);
</script>

<Example>
	<GraphUptime title="API" from="Jun 1" to="Aug 29" days={uptimeDays} />
</Example>
