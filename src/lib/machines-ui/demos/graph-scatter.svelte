<script lang="ts">
	import { GraphScatter } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphScatter
		title="CORRELATION"
		trend
		data={[
			{ x: 1.2, y: 0.8 },
			{ x: 2.0, y: 1.4 },
			{ x: 2.5, y: 1.6 },
			{ x: 3.1, y: 2.1 },
			{ x: 3.6, y: 2.4 },
			{ x: 4.0, y: 2.7 },
			{ x: 4.5, y: 2.9 },
			{ x: 5.0, y: 3.3 },
			{ x: 5.4, y: 3.4, accent: true },
			{ x: 5.9, y: 3.7 },
			{ x: 6.3, y: 4.0 },
			{ x: 6.8, y: 4.1 }
		]}
	/>
</Example>
