<script lang="ts">
	import { GraphStream } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphStream title="THROUGHPUT" unit="req/s" length={44} intervalMs={750} />
</Example>
