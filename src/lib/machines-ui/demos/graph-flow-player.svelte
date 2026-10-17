<script lang="ts">
	import { GraphFlowPlayer } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphFlowPlayer
		title="PIPELINE"
		autoPlay
		speedMs={1400}
		steps={[
			{ label: 'scaffold the parser', detail: 'reads the grammar file' },
			{ label: 'emit tokens', detail: 'one pass, no backtracking' },
			{ label: 'render frames', detail: 'dashed borders, four corners' },
			{ label: 'publish', detail: 'npm and done' }
		]}
	/>
</Example>
