<script lang="ts">
	import { ContextMenu } from '@fractaldesign/fractalsvelte-ui';
</script>

<ContextMenu
	items={[
		{ id: 'inspect', label: 'Inspect component' },
		{ id: 'copy', label: 'Copy import', shortcut: '⌘C' },
		{ id: 'source', label: 'View source' },
		{ id: 'sep', label: '', separator: true },
		{ id: 'delete', label: 'Remove node', danger: true }
	]}
>
	<div class="fs-frame fs-measure-md box xcenter gap-xs pad-2xl bg-surface ta-c">
		<h4 class="card-title text-primary">Right-click anywhere in here</h4>
		<p class="text-body-sm text-muted">
			Opens a menu at the pointer, with shortcuts, a separator and a danger item.
		</p>
	</div>
</ContextMenu>
