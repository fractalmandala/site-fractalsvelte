<script lang="ts">
	import { Tabs } from '@fractaldesign/fractalsvelte-ui/styler';

	let tab = $state('code');
</script>

<div class="box gap-lg wfull">
	<Tabs
		bind:activeTab={tab}
		tabs={[
			{ id: 'code', label: 'Code' },
			{ id: 'preview', label: 'Preview' },
			{ id: 'tests', label: 'Tests', badge: 3 }
		]}
	>
		<p class="text-body-sm text-secondary">Active tab: {tab}</p>
	</Tabs>
	<Tabs
		variant="pill"
		tabs={[
			{ id: 'a', label: 'Pill A' },
			{ id: 'b', label: 'Pill B' }
		]}
	/>
	<Tabs
		variant="bordered"
		tabs={[
			{ id: 'x', label: 'Bordered' },
			{ id: 'y', label: 'Tabs' },
			{ id: 'z', label: 'Disabled', disabled: true }
		]}
	/>
</div>
