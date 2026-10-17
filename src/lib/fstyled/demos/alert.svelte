<script lang="ts">
	import { Alert, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-sm wfull">
	<Alert
		intent="info"
		title="Heads up"
		description="A new version of the design system is available."
		dismissible
	/>
	<Alert intent="success" title="Deployed" description="Production is serving build #418." />
	<Alert intent="warning" title="Quota at 90%" description="Upgrade before the end of the cycle.">
		{#snippet actions()}<Button size="md" variant="secondary">Upgrade</Button>{/snippet}
	</Alert>
	<Alert intent="danger" title="Build failed" description="3 type errors in src/lib/styler." />
</div>
