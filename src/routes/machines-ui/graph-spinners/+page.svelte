<script lang="ts">
	import { GraphSpinners } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphSpinners title="FETCH" kind="bounce" label="loading tiles" speedMs={90} />
	</Example>
</MachineDoc>
