<script lang="ts">
	import { AlertDialog, Button } from '@fractaldesign/fractalsvelte-ui';

	let alertDialogOpen = $state(false);
</script>

<div>
	<Button variant="destructive" onclick={() => (alertDialogOpen = true)}>Delete Repository</Button>
	<AlertDialog
		bind:open={alertDialogOpen}
		title="Confirm Deletion"
		description="Are you absolutely sure? This action cannot be reversed."
		confirmText="Yes, delete it"
		confirmVariant="destructive"
		onconfirm={() => (alertDialogOpen = false)}
	/>
</div>
