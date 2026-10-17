<script lang="ts">
	import { DropdownMenu, Button } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luChevronDown } from 'fractalicons/lucide';

	let last = $state('none');
</script>

<div class="box xcenter gap-sm pb-3xl">
	<DropdownMenu
		items={[
			{ id: 'dup', label: 'Duplicate', shortcut: '⌘D', onclick: () => (last = 'Duplicate') },
			{ id: 'copy', label: 'Copy link', onclick: () => (last = 'Copy link') },
			{ separator: true },
			{ id: 'del', label: 'Delete', danger: true, onclick: () => (last = 'Delete') }
		]}
	>
		{#snippet trigger({ open, toggle })}
			<Button variant="outline" onclick={toggle} aria-expanded={open}>
				Actions
				{#snippet trailing()}<Icon icon={luChevronDown} />{/snippet}
			</Button>
		{/snippet}
	</DropdownMenu>
	<p class="text-body-sm text-secondary">Last: {last}</p>
</div>
