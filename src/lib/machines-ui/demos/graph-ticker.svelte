<script lang="ts">
	import { GraphTicker } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphTicker
		title="FLEET"
		items={[
			{ label: 'api', status: 'ok' },
			{ label: 'db-lag 2.1s', status: 'warn' },
			{ label: 'edge-eu', status: 'down' },
			{ label: 'cdn', status: 'ok' }
		]}
	/>
</Example>
