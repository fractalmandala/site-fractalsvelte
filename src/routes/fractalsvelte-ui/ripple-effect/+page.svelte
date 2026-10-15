<script lang="ts">
	import { RippleEffect } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<RippleEffect color="rgba(255, 62, 0, 0.3)">
		<div class="box xcenter gap-xs py-lg px-xl bg-surface border radius-sm ta-c">
			<h4 class="card-title text-primary">Click for a ripple</h4>
			<p class="text-body-sm text-muted">The wave starts exactly where you click.</p>
		</div>
	</RippleEffect>
</ComponentDoc>
