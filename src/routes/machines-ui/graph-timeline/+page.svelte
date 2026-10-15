<script lang="ts">
	import { GraphTimeline } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphTimeline
			title="SHIPPED"
			events={[
				{ date: 'Mar 12', label: 'npm publish' },
				{ date: 'Mar 18', label: 'docs, live previews', state: 'now' },
				{ date: 'Apr 02', label: '1.0', state: 'next' }
			]}
		/>
	</Example>
</MachineDoc>
