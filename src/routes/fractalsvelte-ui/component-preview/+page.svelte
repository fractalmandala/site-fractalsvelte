<script lang="ts">
	import { Button, ComponentPreview, Switch } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let loading = $state(false);
	const code = `<Button variant="primary" loading={loading}>Save</Button>`;
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
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
</ComponentDoc>
