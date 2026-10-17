<script lang="ts">
	import { GraphWorkflow } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphWorkflow
		title="DEPLOY"
		autoPlay
		speedMs={1100}
		label="a CI pipeline, top-to-bottom"
		nodes={[
			{ id: 'commit', label: 'commit' },
			{ id: 'lint', label: 'lint' },
			{ id: 'test', label: 'test', hint: 'unit + e2e' },
			{ id: 'build', label: 'build' },
			{ id: 'publish', label: 'publish' }
		]}
	/>
</Example>
<Example>
	<GraphWorkflow
		title="CI DIAMOND"
		autoPlay
		speedMs={1100}
		nodes={[
			{ id: 'push', label: 'push' },
			{ id: 'lint', label: 'lint' },
			{ id: 'unit', label: 'unit' },
			{ id: 'e2e', label: 'e2e' },
			{ id: 'build', label: 'build' },
			{ id: 'ship', label: 'ship' }
		]}
		edges={[
			{ from: 'push', to: 'lint' },
			{ from: 'push', to: 'unit' },
			{ from: 'push', to: 'e2e' },
			{ from: 'lint', to: 'build' },
			{ from: 'unit', to: 'build' },
			{ from: 'e2e', to: 'build' },
			{ from: 'build', to: 'ship' }
		]}
	/>
</Example>
