<script lang="ts">
	import { FeatureGrid } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<FeatureGrid
			columns={3}
			items={[
				{ title: 'Svelte 5 Runes', description: 'Engineered entirely with $state, $derived, and snippets.', badge: 'v5.57' },
				{ title: 'Zero Tailwind', description: 'Pure scoped CSS with light and dark mode design tokens.', badge: 'Scoped' },
				{ title: 'AST Doc Gate', description: 'Zero maintenance API reference verified by automated check.', badge: 'Zero Drift' }
			]}
		/>
	</div>
</ComponentDoc>
