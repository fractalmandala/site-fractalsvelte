<script lang="ts">
	import DemoHost from '#lib/docs/DemoHost.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<DemoHost {data} />
