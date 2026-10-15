<script lang="ts">
	import { CodeBlock } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<CodeBlock code={`import { Button, Card3D } from '@fractaldesign/fractalsvelte-ui';\n\n<Button variant="primary">Launch</Button>`} language="svelte" />
	</div>
</ComponentDoc>
