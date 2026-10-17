<script lang="ts">
	import { GraphCron } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphCron
		title="EVERY 15"
		expr="*/15 * * * *"
		count={8}
		baseTime={Date.UTC(2026, 8, 6, 11, 53)}
	/>
</Example>
