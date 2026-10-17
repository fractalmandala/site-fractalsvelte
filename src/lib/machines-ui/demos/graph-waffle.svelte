<script lang="ts">
	import { GraphWaffle } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphWaffle title="COVERAGE" value={0.73} caption="73 of 100 tests green" />
</Example>
