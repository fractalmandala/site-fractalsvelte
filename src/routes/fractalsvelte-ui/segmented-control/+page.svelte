<script lang="ts">
	import { SegmentedControl } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let segmentedValue = $state('day');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<SegmentedControl
		options={[
			{ label: 'Day', value: 'day' },
			{ label: 'Week', value: 'week' },
			{ label: 'Month', value: 'month' },
			{ label: 'Year', value: 'year' }
		]}
		bind:value={segmentedValue}
	/>
</ComponentDoc>
