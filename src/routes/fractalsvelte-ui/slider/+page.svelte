<script lang="ts">
	import { Slider } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let sliderValue = $state(65);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<Slider label="Volume Level" bind:value={sliderValue} min={0} max={100} showValue />
	</div>
</ComponentDoc>
