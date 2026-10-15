<script lang="ts">
	import { Button, DropdownMenu } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
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
</ComponentDoc>
