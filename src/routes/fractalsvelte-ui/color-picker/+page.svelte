<script lang="ts">
	import { ColorPicker } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let colorValue = $state('#6366f1');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<ColorPicker label="Brand Accent" bind:value={colorValue} />
</ComponentDoc>
