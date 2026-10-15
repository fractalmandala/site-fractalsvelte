<script lang="ts">
	import { Meter } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<Meter value={85} min={0} max={100} low={30} high={80} optimum={90} label="Storage Quota" />
	</div>
</ComponentDoc>
