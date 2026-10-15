<script lang="ts">
	import { BorderBeam } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm relative box xcenter gap-xs pad-xl bg-surface border radius-md ta-c">
		<BorderBeam size={180} duration={8} />
		<h4 class="card-title text-primary">Border beam</h4>
		<p class="text-body-sm text-muted">A ray of light travels the card's edge, forever.</p>
	</div>
</ComponentDoc>
