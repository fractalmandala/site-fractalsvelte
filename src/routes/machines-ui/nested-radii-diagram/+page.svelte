<script lang="ts">
	import { NestedRadiiDiagram } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<NestedRadiiDiagram initialOuter={16} initialInset={4} />
	</Example>
</MachineDoc>
