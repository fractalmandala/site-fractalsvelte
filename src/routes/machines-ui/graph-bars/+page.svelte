<script lang="ts">
	import { GraphBars } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphBars
			title="DRAFT TO SHIPPED"
			from={{ label: 'draft', values: [1, 2, 2, 3, 1] }}
			processor="edit"
			to={{ label: 'shipped', size: 'lg', values: [3, 5, 4, 6, 5] }}
		/>
	</Example>
</MachineDoc>
