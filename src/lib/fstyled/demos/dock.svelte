<script lang="ts">
	import { Dock } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luHouse, luFolder, luBell, luCalendar, luTerminal } from 'fractalicons/lucide';

	const icons: Record<string, typeof luHouse> = {
		home: luHouse,
		files: luFolder,
		mail: luBell,
		cal: luCalendar,
		term: luTerminal
	};
</script>

<Dock
	items={[
		{ id: 'home', label: 'Home' },
		{ id: 'files', label: 'Files' },
		{ id: 'mail', label: 'Mail' },
		{ id: 'cal', label: 'Calendar' },
		{ id: 'term', label: 'Terminal' }
	]}
>
	{#snippet itemSnippet({ item })}
		<Icon icon={icons[item.id]} />
	{/snippet}
</Dock>
