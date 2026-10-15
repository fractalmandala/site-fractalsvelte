<script lang="ts">
	import { PinInput } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let pinValue = $state('8492');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box xcenter gap-md">
		<PinInput length={4} bind:value={pinValue} />
		<span class="text-body-sm text-muted">Entered Code: <code>{pinValue}</code></span>
	</div>
</ComponentDoc>
