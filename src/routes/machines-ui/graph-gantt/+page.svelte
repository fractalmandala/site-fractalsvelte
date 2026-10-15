<script lang="ts">
	import { GraphGantt } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphGantt
			title="LAUNCH"
			stage="build"
			progress={0.58}
			ticks={['q1', 'q2', 'q3', 'q4']}
			items={[
				{ label: 'design', start: 0, end: 0.35, complete: 1 },
				{ label: 'build', start: 0.2, end: 0.75, complete: 0.55 },
				{ label: 'docs', start: 0.55, end: 0.9, complete: 0.2 },
				{ label: 'ship', start: 0.85, end: 1, complete: 0 }
			]}
		/>
	</Example>
</MachineDoc>
