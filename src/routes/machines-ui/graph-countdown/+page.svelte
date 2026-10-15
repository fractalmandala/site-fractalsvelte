<script lang="ts">
	import { GraphCountdown } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphCountdown
			title="FREEZE"
			to="2027-01-01T00:00:00Z"
			done="open"
			caption="until launch"
		/>
	</Example>
</MachineDoc>
