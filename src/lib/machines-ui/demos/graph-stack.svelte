<script lang="ts">
	import { GraphStack } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphStack
		title="BUNDLE"
		palette="multi"
		rows={[
			{
				label: 'marketing',
				segments: [
					{ label: 'js', value: 48 },
					{ label: 'css', value: 22 },
					{ label: 'images', value: 30 }
				]
			},
			{
				label: 'docs',
				segments: [
					{ label: 'js', value: 28 },
					{ label: 'css', value: 18 },
					{ label: 'images', value: 54 }
				]
			}
		]}
	/>
</Example>
