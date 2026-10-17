<script lang="ts">
	import { GraphSlope } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphSlope
		title="TRAFFIC"
		palette="duo"
		fromLabel="2025"
		toLabel="2026"
		items={[
			{ label: 'docs', from: 8200, to: 12400 },
			{ label: 'copy', from: 5100, to: 4100 },
			{ label: 'ship', from: 640, to: 860 }
		]}
	/>
</Example>
