<script lang="ts">
	import { GraphTimeline } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphTimeline
		title="SHIPPED"
		events={[
			{ date: 'Mar 12', label: 'npm publish' },
			{ date: 'Mar 18', label: 'docs, live previews', state: 'now' },
			{ date: 'Apr 02', label: '1.0', state: 'next' }
		]}
	/>
</Example>
