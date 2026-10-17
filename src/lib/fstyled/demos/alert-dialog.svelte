<script lang="ts">
	import { AlertDialog, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let open = $state(false);
	let result = $state('Nothing yet.');
</script>

<div class="box xcenter gap-sm">
	<Button variant="destructive" onclick={() => (open = true)}>Delete project</Button>
	<p class="text-body-sm text-secondary">{result}</p>
</div>
<AlertDialog
	bind:open
	title="Delete project?"
	description="This permanently removes the project and its deployments."
	confirmText="Delete"
	onconfirm={() => ((open = false), (result = 'Deleted.'))}
	oncancel={() => (result = 'Cancelled.')}
/>
