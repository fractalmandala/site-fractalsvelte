<script lang="ts">
	import { GraphMandala } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphMandala title="YANTRA" cols={48} rows={24} folds={8} rings={5} />
	</Example>
</MachineDoc>
