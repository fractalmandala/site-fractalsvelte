<script lang="ts">
	import { GraphCalendar } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphCalendar year={2026} month={8} today={27} marks={[12, 18, 27]} />
	</Example>
</MachineDoc>
