<script lang="ts">
	import { Badge, SpotlightCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<SpotlightCard class="fs-measure-sm">
		<div class="box gap-sm">
			<div class="row"><Badge variant="primary">Spotlight</Badge></div>
			<h4 class="card-title text-primary">Flashlight cursor</h4>
			<p class="text-body-sm text-muted lh15">
				A soft radial light follows your pointer across the surface and the border.
			</p>
		</div>
	</SpotlightCard>
</ComponentDoc>
