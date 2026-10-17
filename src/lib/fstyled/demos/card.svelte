<script lang="ts">
	import { Card, Badge, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<Card title="Deployment" description="Production · us-east-1" elevation="sm">
		{#snippet headerExtra()}<Badge variant="success" dot>Live</Badge>{/snippet}
		<p class="text-body-sm">Last deployed 4 minutes ago by Ada.</p>
		{#snippet footer()}
			<Button size="md">Open</Button>
			<Button variant="ghost" size="md">Logs</Button>
		{/snippet}
	</Card>
	<Card variant="soft" title="Soft card" description="data-variant=soft" padding="md" />
	<Card
		variant="secondary"
		title="Secondary"
		description="Sunken with a strong border"
		shape="modern"
	/>
	<Card
		variant="outline"
		title="Outline"
		description="Transparent with a strong border"
		elevation="md"
	/>
</div>
