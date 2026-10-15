<script lang="ts">
	import { RangeSlider } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let rangeMin = $state(25);
	let rangeMax = $state(75);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<RangeSlider label="Price Window" bind:minVal={rangeMin} bind:maxVal={rangeMax} min={0} max={100} />
	</div>
</ComponentDoc>
