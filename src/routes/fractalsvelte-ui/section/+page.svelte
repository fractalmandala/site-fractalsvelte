<script lang="ts">
	import { Section } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg bg-surface border radius-sm">
		<Section title="Design Engineering" subtitle="Foundations of modern reactive component architectures">
			<p class="text-body-sm text-muted">Clean containment with semantic header hierarchy.</p>
		</Section>
	</div>
</ComponentDoc>
