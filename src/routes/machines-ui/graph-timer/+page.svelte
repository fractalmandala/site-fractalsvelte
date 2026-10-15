<script lang="ts">
	import { GraphTimer } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphTimer title="UPTIME" kind="elapsed" at="2026-08-01T00:00:00Z" caption="api" />
	</Example>
</MachineDoc>
