<script lang="ts">
	import { AlertDialog, Button } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let alertDialogOpen = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div>
		<Button variant="destructive" onclick={() => alertDialogOpen = true}>Delete Repository</Button>
		<AlertDialog
			bind:open={alertDialogOpen}
			title="Confirm Deletion"
			description="Are you absolutely sure? This action cannot be reversed."
			confirmText="Yes, delete it"
			confirmVariant="destructive"
			onconfirm={() => alertDialogOpen = false}
		/>
	</div>
</ComponentDoc>
