<script lang="ts">
	import { GraphStat } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphStat
			title="THIS WEEK"
			items={[
				{ value: '12,400', label: 'docs' },
				{ value: '4,100', label: 'copies' },
				{ value: '860', label: 'shipped', accent: true }
			]}
		/>
	</Example>
</MachineDoc>
