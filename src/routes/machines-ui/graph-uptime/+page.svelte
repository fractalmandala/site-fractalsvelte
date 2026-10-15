<script lang="ts">
	import { GraphUptime } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const uptimeDays = Array.from({ length: 90 }, (_, index) =>
		index === 41 || index === 42
			? 'down'
			: index === 18 || index === 60 || index === 61
				? 'degraded'
				: 'ok'
	);
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphUptime title="API" from="Jun 1" to="Aug 29" days={uptimeDays} />
	</Example>
</MachineDoc>
