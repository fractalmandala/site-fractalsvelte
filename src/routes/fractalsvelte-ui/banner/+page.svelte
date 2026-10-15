<script lang="ts">
	import { Banner } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<Banner intent="info">
			Fractal UI v0.1.0 is officially released with Svelte 5 Runes!
		</Banner>
	</div>
</ComponentDoc>
