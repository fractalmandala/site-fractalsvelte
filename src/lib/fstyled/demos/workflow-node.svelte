<script lang="ts">
	import { WorkflowNode } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ytop xcenter gap-lg wrap">
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
	<WorkflowNode
		title="Deploy"
		subtitle="vercel"
		status="error"
		statusLabel="Rejected"
		inputs={[{ id: 'i', label: 'artifact' }]}
	>
		<span>Missing VERCEL_TOKEN</span>
	</WorkflowNode>
</div>
