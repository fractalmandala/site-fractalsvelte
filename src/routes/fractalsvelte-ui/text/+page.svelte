<script lang="ts">
	import { Text } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-sm fs-measure-md">
		<Text variant="lead">Lead paragraph introducing the design system foundation.</Text>
		<Text variant="body">Regular body text rendered with balanced typography tracking and token colors.</Text>
		<Text variant="muted">Muted secondary annotation text.</Text>
	</div>
</ComponentDoc>
