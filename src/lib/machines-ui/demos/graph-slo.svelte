<script lang="ts">
	import { GraphSlo } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphSlo
		title="CHECKOUT 99.9%"
		budget={0.62}
		window={30}
		unit="d"
		elapsed={18}
		target={0.001}
		actual={0.0014}
		daily={[
			0.02, 0.03, 0.04, 0.025, 0.05, 0.06, 0.04, 0.07, 0.05, 0.045, 0.06, 0.08, 0.05, 0.09, 0.07,
			0.06, 0.08, 0.1
		]}
	/>
</Example>
