<script lang="ts">
	import { SideNav } from '@fractaldesign/fractalsvelte-ui';

	let sideNavActive = $state('actions');
</script>

<div class="fs-measure-sm fs-stage-md bg-surface border radius-sm">
	<SideNav
		items={[
			{ id: 'intro', label: 'Introduction', group: 'Getting Started' },
			{ id: 'tokens', label: 'Tokens CSS', group: 'Getting Started' },
			{ id: 'actions', label: 'Actions', group: 'Components', badge: '8' },
			{ id: 'forms', label: 'Forms', group: 'Components', badge: '16' },
			{ id: 'motion', label: 'Motion', group: 'Components', badge: '13' }
		]}
		bind:activeId={sideNavActive}
	/>
</div>
