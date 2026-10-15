<script lang="ts">
	import { ShimmerEffect } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<ShimmerEffect duration={2.5}>
			<div class="box gap-xs py-lg px-xl bg-surface border radius-sm">
				<h4 class="card-title text-primary">Shimmer sweep</h4>
				<p class="text-body-sm text-muted">A band of light passes over whatever you wrap.</p>
			</div>
		</ShimmerEffect>
	</div>
</ComponentDoc>
