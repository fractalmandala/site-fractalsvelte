<script lang="ts">
	// Hosts one component page: resolves the lazily-loaded demo for this set + slug
	// and hands everything to the shared DocPage.
	import DocPage from './DocPage.svelte';
	import { demoLoader } from './demo-components.js';
	import type { ComponentPageData } from '#lib/server/docs/load.js';

	let { data }: { data: ComponentPageData } = $props();

	const loader = $derived(demoLoader(data.setId, data.component.slug));
</script>

<DocPage
	component={data.component}
	set={data.set}
	crumbs={data.seo.breadcrumbs}
	import={data.import}
	usage={data.usage}
	examples={data.examples}
	samples={data.samples}
	helpers={data.helpers}
	source={data.source}
	wrapPreview={data.set.wrapPreview}
	loadDemo={loader}
/>
