<script lang="ts">
	import { GraphStat } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphStat
		title="THIS WEEK"
		items={[
			{ value: '12,400', label: 'docs' },
			{ value: '4,100', label: 'copies' },
			{ value: '860', label: 'shipped', accent: true }
		]}
	/>
</Example>
