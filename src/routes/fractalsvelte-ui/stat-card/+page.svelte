<script lang="ts">
	import { StatCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<StatCard title="Active Runes Components" value="106" delta="+100%" deltaType="increase" timeframe="vs legacy Svelte 4" />
	</div>
</ComponentDoc>
