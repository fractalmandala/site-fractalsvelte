<script lang="ts">
	import { NumberInput } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let numberValue = $state(5);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<NumberInput label="Quantity" bind:value={numberValue} min={1} max={100} step={1} />
	</div>
</ComponentDoc>
