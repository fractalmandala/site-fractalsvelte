<script lang="ts">
	import { FlowCanvas } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<div class="fs-stage-lg border radius-sm">
			<FlowCanvas />
		</div>
	</Example>
</MachineDoc>
