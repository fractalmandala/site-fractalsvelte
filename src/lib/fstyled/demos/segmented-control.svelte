<script lang="ts">
	import { SegmentedControl } from '@fractaldesign/fractalsvelte-ui/styler';

	let view = $state('grid');
</script>

<div class="box xcenter gap-md">
	<SegmentedControl
		bind:value={view}
		options={[
			{ value: 'grid', label: 'Grid' },
			{ value: 'list', label: 'List' },
			{ value: 'board', label: 'Board' }
		]}
	/>
	<SegmentedControl
		size="lg"
		value="b"
		options={[
			{ value: 'a', label: 'Daily' },
			{ value: 'b', label: 'Weekly' },
			{ value: 'c', label: 'Monthly', disabled: true }
		]}
	/>
	<p class="text-body-sm text-secondary">View: {view}</p>
</div>
