<script lang="ts">
	import { SegmentedControl } from '@fractaldesign/fractalsvelte-ui';

	let segmentedValue = $state('day');
</script>

<SegmentedControl
	options={[
		{ label: 'Day', value: 'day' },
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' },
		{ label: 'Year', value: 'year' }
	]}
	bind:value={segmentedValue}
/>
