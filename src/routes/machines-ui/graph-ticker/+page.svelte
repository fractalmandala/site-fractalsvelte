<script lang="ts">
	import { GraphTicker } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphTicker
			title="FLEET"
			items={[
				{ label: 'api', status: 'ok' },
				{ label: 'db-lag 2.1s', status: 'warn' },
				{ label: 'edge-eu', status: 'down' },
				{ label: 'cdn', status: 'ok' }
			]}
		/>
	</Example>
</MachineDoc>
