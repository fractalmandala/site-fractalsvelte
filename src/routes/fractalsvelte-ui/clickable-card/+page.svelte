<script lang="ts">
	import { ClickableCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<ClickableCard title="Interactive Exploration" description="Hover for lift feedback and press for smooth scale." />
	</div>
</ComponentDoc>
