<script lang="ts">
	import { Tabs } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let activeTab = $state('overview');
	const tabsData = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'props', label: 'API Specs' },
		{ id: 'changelog', label: 'Changelog' }
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<Tabs tabs={tabsData} bind:activeTab={activeTab}>
			<div class="pad-lg bg-surface border radius-sm mt-sm">
				<p class="text-body text-primary">Active View: <strong>{activeTab}</strong></p>
			</div>
		</Tabs>
	</div>
</ComponentDoc>
