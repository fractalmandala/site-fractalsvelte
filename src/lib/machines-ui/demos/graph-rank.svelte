<script lang="ts">
	import { GraphRank } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphRank
		title="ROUTES"
		items={[
			{ label: '/docs', value: 12400 },
			{ label: '/install', value: 4100 },
			{ label: '/plot', value: 860 },
			{ label: '/rank', value: 420 }
		]}
	/>
</Example>
