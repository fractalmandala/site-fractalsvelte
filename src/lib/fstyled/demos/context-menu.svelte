<script lang="ts">
	import { ContextMenu } from '@fractaldesign/fractalsvelte-ui/styler';

	let last = $state('none');
</script>

<div class="box gap-sm wfull pb-3xl">
	<ContextMenu
		items={[
			{ id: 'open', label: 'Open', onselect: () => (last = 'Open') },
			{ id: 'rename', label: 'Rename', shortcut: 'F2', onselect: () => (last = 'Rename') },
			{ id: 'sep', separator: true },
			{ id: 'rm', label: 'Delete', danger: true, onselect: () => (last = 'Delete') }
		]}
	>
		<div
			class="pad-xl border radius-md bg-sunken text-sm text-muted ta-c"
			tabindex="0"
			role="button"
		>
			Right-click (or Shift+F10) this region
		</div>
	</ContextMenu>
	<p class="text-body-sm text-secondary">Last: {last}</p>
</div>
