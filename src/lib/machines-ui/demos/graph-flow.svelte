<script lang="ts">
	import { GraphFlow } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphFlow
		title="OPTIMISTIC UI"
		rows={[
			{ nodes: [{ label: 'tap' }, { label: 'server' }, { label: 'update' }] },
			{
				nodes: [
					{ label: 'tap' },
					{ label: 'update', tone: 'accent' },
					{ label: 'server syncs', stretch: true, tone: 'muted' }
				]
			}
		]}
	/>
</Example>
