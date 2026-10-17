<script lang="ts">
	import { Button, DropdownMenu } from '@fractaldesign/fractalsvelte-ui';
</script>

<DropdownMenu
	items={[
		{ id: 'edit', label: 'Edit Project' },
		{ id: 'duplicate', label: 'Duplicate Entry' },
		{ id: 'delete', label: 'Delete Item', danger: true }
	]}
>
	{#snippet trigger({ toggle })}
		<Button variant="outline" onclick={toggle}>Open Menu ▾</Button>
	{/snippet}
</DropdownMenu>
