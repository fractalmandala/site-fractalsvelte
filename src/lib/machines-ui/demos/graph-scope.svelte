<script lang="ts">
	import { GraphScope } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphScope
		title="RPM"
		mode="area"
		data={[12, 18, 31, 27, 44, 39, 52, 48, 61, 55, 40, 33, 25, 29, 37, 46, 58, 50, 42, 35]}
	/>
</Example>
