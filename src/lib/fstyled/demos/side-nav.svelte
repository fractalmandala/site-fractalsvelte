<script lang="ts">
	import { SideNav, Button } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luBell, luFolder, luCalendar } from 'fractalicons/lucide';

	let activeId = $state('inbox');
	let collapsed = $state(false);
</script>

<div class="box gap-md wfull">
	{#snippet inboxIcon()}<Icon icon={luBell} />{/snippet}
	{#snippet draftsIcon()}<Icon icon={luFolder} />{/snippet}
	{#snippet calIcon()}<Icon icon={luCalendar} />{/snippet}
	<SideNav
		bind:activeId
		bind:collapsed
		items={[
			{ id: 'inbox', label: 'Inbox', group: 'Mail', badge: 12, icon: inboxIcon },
			{ id: 'drafts', label: 'Drafts', group: 'Mail', icon: draftsIcon },
			{ id: 'cal', label: 'Calendar', group: 'Apps', icon: calIcon },
			{ id: 'files', label: 'Files', group: 'Apps', disabled: true, icon: draftsIcon }
		]}
	/>
	<Button variant="secondary" onclick={() => (collapsed = !collapsed)}
		>{collapsed ? 'Expand' : 'Collapse'}</Button
	>
</div>
