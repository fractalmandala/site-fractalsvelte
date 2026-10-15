<script lang="ts">
	import { Badge, StaggerList } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let staggerItems = $state([
		{ id: '1', title: 'Compile Pipeline', status: 'Optimal', latency: '12ms' },
		{ id: '2', title: 'Docs Quality Gate', status: 'Passed', latency: '4ms' },
		{ id: '3', title: 'Edge CDN Mesh', status: 'Synced', latency: '18ms' }
	]);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<StaggerList items={staggerItems}>
			{#snippet itemSnippet({ item })}
				<div class="row ycenter xbetween gap-md py-md px-bs bg-surface border radius-md">
					<div class="box">
						<div class="weight-600 text-body-sm">{item.title}</div>
						<div class="text-body-sm text-muted">{item.latency}</div>
					</div>
					<Badge variant="success">{item.status}</Badge>
				</div>
			{/snippet}
		</StaggerList>
	</div>
</ComponentDoc>
