<script lang="ts">
	import { Button, Dialog } from '@fractaldesign/fractalsvelte-ui';

	let dialogOpen = $state(false);
</script>

<div class="box xcenter">
	<Button variant="primary" onclick={() => (dialogOpen = true)}>Trigger Modal Dialog</Button>
	<Dialog
		bind:open={dialogOpen}
		title="Svelte 5 Dialog"
		description="Accessible modal window with backdrop click and escape key support."
	>
		<p class="text-primary text-body-sm">
			This dialog was opened via reactive $bindable(open) rune state.
		</p>
		<div class="row xright gap-sm mt-lg">
			<Button variant="secondary" onclick={() => (dialogOpen = false)}>Close</Button>
		</div>
	</Dialog>
</div>
