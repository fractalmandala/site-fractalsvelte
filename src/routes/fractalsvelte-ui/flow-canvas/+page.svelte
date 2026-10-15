<script lang="ts">
	import { FlowCanvas, WorkflowNode } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg border radius-sm">
		<FlowCanvas>
			<WorkflowNode
				x={40}
				y={40}
				title="Webhook"
				subtitle="On push to main"
				status="success"
				outputs={[{ id: 'payload', label: 'payload' }]}
			/>
			<WorkflowNode
				x={320}
				y={120}
				title="Deploy"
				subtitle="Build and release"
				status="running"
				inputs={[{ id: 'payload', label: 'payload' }]}
			/>
		</FlowCanvas>
	</div>
	<p class="text-body-sm text-muted">Drag the background to pan. ⌘/Ctrl + scroll, or pinch, to zoom.</p>
</ComponentDoc>
