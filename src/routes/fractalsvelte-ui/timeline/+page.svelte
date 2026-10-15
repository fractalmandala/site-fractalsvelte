<script lang="ts">
	import { Timeline } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<Timeline
			items={[
				{ title: 'Project Initialized', time: 'Phase 1', description: 'Tokens and types established' },
				{ title: '106 Components Built', time: 'Phase 2', description: 'Svelte 5 runes implemented' },
				{ title: 'Documentation Gate', time: 'Phase 3', description: 'Zero drift verification passed' }
			]}
		/>
	</div>
</ComponentDoc>
