<script lang="ts">
	import { MorphingTabs } from '@fractaldesign/fractalsvelte-ui/styler';

	let filter = $state('all');
</script>

<div class="box gap-lg xcenter">
	<MorphingTabs
		bind:value={filter}
		items={[
			{ id: 'all', label: 'All' },
			{ id: 'active', label: 'Active', badge: 4 },
			{ id: 'archived', label: 'Archived' }
		]}
	/>
	<MorphingTabs
		variant="underline"
		items={[
			{ id: 'one', label: 'Underline' },
			{ id: 'two', label: 'Morph' },
			{ id: 'three', label: 'Indicator' }
		]}
	/>
	<MorphingTabs
		variant="segmented"
		items={[
			{ id: 's1', label: 'Segmented' },
			{ id: 's2', label: 'Style' }
		]}
	/>
	<p class="text-body-sm text-secondary">Filter: {filter}</p>
</div>
