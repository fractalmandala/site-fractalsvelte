<script lang="ts">
	import { Card3D } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<Card3D>
			<div class="box xcenter gap-xs pad-xl ta-c">
				<h4 class="card-title text-primary">3D tilt</h4>
				<p class="text-body-sm text-muted">Move your pointer across the card to tilt it in perspective.</p>
			</div>
		</Card3D>
	</div>
</ComponentDoc>
