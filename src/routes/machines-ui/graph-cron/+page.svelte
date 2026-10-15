<script lang="ts">
	import { GraphCron } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphCron
			title="EVERY 15"
			expr="*/15 * * * *"
			count={8}
			baseTime={Date.UTC(2026, 8, 6, 11, 53)}
		/>
	</Example>
</MachineDoc>
