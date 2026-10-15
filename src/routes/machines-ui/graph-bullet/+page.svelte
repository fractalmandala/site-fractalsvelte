<script lang="ts">
	import { GraphBullet } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphBullet
			title="LOAD"
			palette="duo"
			items={[
				{ label: 'CPU', value: 72, target: 80, max: 100 },
				{ label: 'RAM', value: 34, target: 64, max: 100 },
				{ label: 'SSD', value: 91, target: 90, max: 100 }
			]}
		/>
	</Example>
</MachineDoc>
