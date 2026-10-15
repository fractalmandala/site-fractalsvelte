<script lang="ts">
	import { GraphFlowPlayer } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphFlowPlayer
			title="PIPELINE"
			autoPlay
			speedMs={1400}
			steps={[
				{ label: 'scaffold the parser', detail: 'reads the grammar file' },
				{ label: 'emit tokens', detail: 'one pass, no backtracking' },
				{ label: 'render frames', detail: 'dashed borders, four corners' },
				{ label: 'publish', detail: 'npm and done' }
			]}
		/>
	</Example>
</MachineDoc>
