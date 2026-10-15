<script lang="ts">
	import { Code, Text } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Text>
		Install the package using <Code>pnpm add @fractaldesign/fractalsvelte-ui</Code> to get started.
	</Text>
</ComponentDoc>
