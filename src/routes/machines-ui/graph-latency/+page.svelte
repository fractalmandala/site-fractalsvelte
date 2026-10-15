<script lang="ts">
	import { GraphLatency } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphLatency
			title="CHECKOUT"
			unit="ms"
			labels={['09:00', '09:30']}
			data={Array.from({ length: 30 }, (_, i) => {
				const baseline = 90 + Math.sin(i / 3) * 20;
				const drift = 220 + Math.cos(i / 4) * 60 + i * 6;
				const tail = 480 + Math.sin(i / 2) * 140 + i * 4;
				const spike = i === 12 || i === 22;
				return {
					p50: Math.round(baseline),
					p95: Math.round(drift + 80),
					p99: Math.round(tail + 120 + (spike ? 600 : 0)),
					spike
				};
			})}
		/>
	</Example>
</MachineDoc>
