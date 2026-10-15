<script lang="ts">
	import { HeroBlock } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<HeroBlock
			badge="Component Library"
			headingLevel={2}
			title="Modern Svelte 5 Runes"
			description="High-performance, zero-Tailwind UI blocks designed for enterprise SvelteKit applications."
		/>
	</div>
</ComponentDoc>
