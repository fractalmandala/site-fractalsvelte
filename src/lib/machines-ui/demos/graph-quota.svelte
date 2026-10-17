<script lang="ts">
	import { GraphQuota } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphQuota
		title="API QUOTA — OPENAI"
		used={124_500}
		limit={200_000}
		unit="API calls"
		resets="Oct 1"
		daysInto={18}
		daysTotal={30}
	/>
</Example>
