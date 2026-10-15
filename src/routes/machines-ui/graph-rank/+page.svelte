<script lang="ts">
	import { GraphRank } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphRank
			title="ROUTES"
			items={[
				{ label: '/docs', value: 12400 },
				{ label: '/install', value: 4100 },
				{ label: '/plot', value: 860 },
				{ label: '/rank', value: 420 }
			]}
		/>
	</Example>
</MachineDoc>
