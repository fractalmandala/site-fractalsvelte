<script lang="ts">
	import { GraphWaffle } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphWaffle title="COVERAGE" value={0.73} caption="73 of 100 tests green" />
	</Example>
</MachineDoc>
