<script lang="ts">
	import { GraphFlow } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphFlow
			title="OPTIMISTIC UI"
			rows={[
				{ nodes: [{ label: 'tap' }, { label: 'server' }, { label: 'update' }] },
				{
					nodes: [
						{ label: 'tap' },
						{ label: 'update', tone: 'accent' },
						{ label: 'server syncs', stretch: true, tone: 'muted' }
					]
				}
			]}
		/>
	</Example>
</MachineDoc>
