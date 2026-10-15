<script lang="ts">
	import { WorkflowNode } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<WorkflowNode
			title="AST Scanner Node"
			subtitle="TypeScript Compiler API"
			status="idle"
			inputs={[{ id: 'i1', label: 'Svelte Source' }]}
			outputs={[{ id: 'o1', label: 'manifest.json' }]}
		/>
	</div>
</ComponentDoc>
