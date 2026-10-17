<script lang="ts">
	import { Badge, Dock } from '@fractaldesign/fractalsvelte-ui';

	let dockClicked = $state('Dashboard');
</script>

<div class="box xcenter gap-md">
	<Dock
		items={[
			{ id: '1', label: 'Finder', onclick: () => (dockClicked = 'Finder') },
			{ id: '2', label: 'Terminal', onclick: () => (dockClicked = 'Terminal') },
			{ id: '3', label: 'Code Editor', onclick: () => (dockClicked = 'Code Editor') },
			{ id: '4', label: 'Browser', onclick: () => (dockClicked = 'Browser') },
			{ id: '5', label: 'Settings', onclick: () => (dockClicked = 'Settings') }
		]}
	/>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Badge variant="primary">Last Clicked: {dockClicked}</Badge>
	</div>
</div>
