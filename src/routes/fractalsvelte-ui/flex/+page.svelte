<script lang="ts">
	import { Badge, Flex } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<Flex gap="md" align="center" justify="between">
			<Badge variant="primary">Flex Start</Badge>
			<Badge variant="surface">Flex End</Badge>
		</Flex>
	</div>
</ComponentDoc>
