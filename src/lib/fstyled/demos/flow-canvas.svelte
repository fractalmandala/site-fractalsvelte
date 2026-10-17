<script lang="ts">
	import { FlowCanvas, WorkflowNode } from '@fractaldesign/fractalsvelte-ui/styler';

	let zoom = $state(1);
</script>

<div class="box gap-sm wfull">
	<FlowCanvas ratio="16/9" bind:zoom>
		<WorkflowNode
			title="Trigger"
			subtitle="On push"
			status="success"
			outputs={[{ id: 'o', label: 'event' }]}
		/>
		<WorkflowNode
			title="Build"
			subtitle="pnpm build"
			status="running"
			selected
			inputs={[{ id: 'i', label: 'event' }]}
			outputs={[{ id: 'o', label: 'artifact' }]}
		/>
	</FlowCanvas>
	<p class="text-body-sm text-secondary ta-c">
		Drag the background to pan, wheel to zoom. Zoom: {Math.round(zoom * 100)}%
	</p>
</div>
