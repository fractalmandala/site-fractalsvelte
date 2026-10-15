<script lang="ts">
	import { Grid } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<Grid columns={3} gap="sm">
			<div class="pad-bs bg-surface border radius-sm ta-c text-body">Cell 1</div>
			<div class="pad-bs bg-surface border radius-sm ta-c text-body">Cell 2</div>
			<div class="pad-bs bg-surface border radius-sm ta-c text-body">Cell 3</div>
			<div class="pad-bs bg-surface border radius-sm ta-c text-body">Cell 4</div>
			<div class="pad-bs bg-surface border radius-sm ta-c text-body">Cell 5</div>
			<div class="pad-bs bg-surface border radius-sm ta-c text-body">Cell 6</div>
		</Grid>
	</div>
</ComponentDoc>
