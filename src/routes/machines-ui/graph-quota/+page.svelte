<script lang="ts">
	import { GraphQuota } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphQuota
			title="API QUOTA — OPENAI"
			used={124_500}
			limit={200_000}
			unit="API calls"
			resets="Oct 1"
			daysInto={18}
			daysTotal={30}
		/>
	</Example>
</MachineDoc>
