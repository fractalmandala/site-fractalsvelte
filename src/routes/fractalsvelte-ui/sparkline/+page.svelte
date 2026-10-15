<script lang="ts">
	import { Sparkline } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-xl wrap wfull">
		<div class="box gap-xs">
			<span class="text-body-sm text-muted">Throughput</span>
			<Sparkline data={[15, 28, 22, 35, 48, 42, 60, 75]} width={140} height={36} color="var(--f-primary)" />
		</div>
		<div class="box gap-xs">
			<span class="text-body-sm text-muted">Latency</span>
			<Sparkline data={[65, 50, 48, 55, 30, 25, 20, 18]} width={140} height={36} color="var(--f-info)" />
		</div>
	</div>
</ComponentDoc>
