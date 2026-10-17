<script lang="ts">
	import { Toast, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-sm wfull">
	<Toast title="Saved" message="Your changes are live." intent="success" duration={0} />
	<Toast title="Heads up" message="Hover to pause the timer." intent="info" duration={8000} />
	<Toast title="Upload failed" message="The file is over 5 MB." intent="danger" duration={0}>
		{#snippet action()}<Button size="md" variant="secondary">Retry</Button>{/snippet}
	</Toast>
</div>
