<script lang="ts">
	import { Button, ComponentPreview, Switch } from '@fractaldesign/fractalsvelte-ui';

	let loading = $state(false);
	const code = `<Button variant="primary" loading={loading}>Save</Button>`;
</script>

<div class="fs-measure-lg">
	<ComponentPreview
		title="Save button"
		description="A preview frame with a controls bar and a copy-code button."
		{code}
	>
		<Button variant="primary" {loading}>Save</Button>
		{#snippet controls()}
			<Switch bind:checked={loading} size="sm" label="loading" />
		{/snippet}
	</ComponentPreview>
</div>
