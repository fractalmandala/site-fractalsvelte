<script lang="ts">
	import { GraphTypewriter } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphTypewriter
		title="BOOT"
		speedMs={45}
		lines={['> boot machines-ui', '> mounting frames... ok', '> ready']}
	/>
</Example>
