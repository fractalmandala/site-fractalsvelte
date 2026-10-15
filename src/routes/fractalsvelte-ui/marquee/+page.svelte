<script lang="ts">
	import { Marquee } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg border radius-sm py-md">
		<Marquee speed={25}>
			<span class="px-lg weight-600 text-theme">SVELTE 5 RUNES</span>
			<span class="px-lg weight-600 text-primary">SCOPED STYLES</span>
			<span class="px-lg weight-600 text-success">DESIGN TOKENS</span>
			<span class="px-lg weight-600 text-info">124 COMPONENTS</span>
		</Marquee>
	</div>
</ComponentDoc>
