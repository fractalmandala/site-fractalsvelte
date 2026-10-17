<script lang="ts">
	import { GraphCompare } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphCompare
		title="PLANS"
		columns={['Solo', 'Studio']}
		accent="Studio"
		rows={[
			{ label: 'Registry', values: [true, true] },
			{ label: 'Accent picker', values: [true, true] },
			{ label: 'Private source', values: [false, true] },
			{ label: 'Price', values: ['$0', '$24'] }
		]}
	/>
</Example>
