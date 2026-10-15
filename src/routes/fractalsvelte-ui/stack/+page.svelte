<script lang="ts">
	import { Badge, Stack } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Stack gap="md">
		<Badge variant="primary">Stack Item 1</Badge>
		<Badge variant="surface">Stack Item 2</Badge>
		<Badge variant="outline">Stack Item 3</Badge>
	</Stack>
</ComponentDoc>
