<script lang="ts">
	import { CanvasMotion } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg fs-stage-md border radius-sm">
		<CanvasMotion
			particleCount={50}
			particleColor="rgba(255, 62, 0, 0.7)"
			lineColor="rgba(255, 62, 0, 0.2)"
		/>
	</div>
	<p class="text-body-sm text-muted">Move your pointer over the canvas to pull the constellation.</p>
</ComponentDoc>
