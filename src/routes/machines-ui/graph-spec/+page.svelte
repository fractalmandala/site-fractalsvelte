<script lang="ts">
	import { GraphSpec } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphSpec
			title="TYPE"
			rows={[
				{ label: 'Family', value: 'Geist Mono' },
				{ label: 'Size', value: '14 / 21' },
				{ label: 'Tracking', value: '+0.02em' },
				{ label: 'Figures', value: 'tabular' },
				{ label: 'Accent', value: '--graph-accent', accent: true },
				{ label: 'Duo', value: '--graph-accent-2' },
				{ label: 'Tri', value: '--graph-accent-3' }
			]}
		/>
	</Example>
</MachineDoc>
