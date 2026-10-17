<script lang="ts">
	import { GraphCells } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphCells
		title="TWO WAYS TO LEARN"
		items={[
			{
				label: 'fragments',
				cells: [
					[1, 0, 1, 0, 0],
					[0, 1, 0, 1, 0],
					[1, 0, 0, 0, 1]
				]
			},
			{
				label: 'a system',
				cells: [
					[1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1]
				]
			}
		]}
	/>
</Example>
