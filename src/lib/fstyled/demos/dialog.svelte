<script lang="ts">
	import { Dialog, Button, Input } from '@fractaldesign/fractalsvelte-ui/styler';

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Rename project</Button>
<Dialog bind:open title="Rename project" description="Choose a short, memorable name.">
	<Input label="Name" value="fractal-ui" />
	{#snippet footer()}
		<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button onclick={() => (open = false)}>Save</Button>
	{/snippet}
</Dialog>
