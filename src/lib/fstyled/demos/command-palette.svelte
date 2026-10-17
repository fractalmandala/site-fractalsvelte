<script lang="ts">
	import { CommandPalette, Button } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luCommand } from 'fractalicons/lucide';

	let open = $state(false);
	let last = $state('none');
</script>

<div class="box xcenter gap-sm">
	<Button variant="secondary" onclick={() => (open = true)}>
		{#snippet leading()}<Icon icon={luCommand} />{/snippet}
		Open command palette
	</Button>
	<p class="text-body-sm text-secondary">Or press ⌘K / Ctrl+K. Last run: {last}</p>
</div>
<CommandPalette
	bind:open
	onselect={(id) => (last = id)}
	groups={[
		{
			category: 'Files',
			items: [
				{ id: 'new', label: 'New file', shortcut: '⌘N' },
				{ id: 'open', label: 'Open…', description: 'Browse the workspace' }
			]
		},
		{
			category: 'Actions',
			items: [
				{ id: 'copy', label: 'Copy link' },
				{ id: 'trash', label: 'Move to trash' }
			]
		}
	]}
/>
