<script lang="ts">
	import { Heading } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-sm">
		<Heading level={2}>H2 Primary Heading</Heading>
		<Heading level={3} gradient>H3 Gradient Accent Heading</Heading>
		<Heading level={4}>H4 Section Title</Heading>
	</div>
</ComponentDoc>
