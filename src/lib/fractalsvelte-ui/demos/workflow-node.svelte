<script lang="ts">
	import { WorkflowNode } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-sm">
	<WorkflowNode
		title="AST Scanner Node"
		subtitle="TypeScript Compiler API"
		status="idle"
		inputs={[{ id: 'i1', label: 'Svelte Source' }]}
		outputs={[{ id: 'o1', label: 'manifest.json' }]}
	/>
</div>
