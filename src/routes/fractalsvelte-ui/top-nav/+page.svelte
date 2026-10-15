<script lang="ts">
	import { TopNav } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let topNavActive = $state('popular');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg pad-sm bg-surface border radius-sm">
		<TopNav
			items={[
				{ id: 'all', label: 'All Components' },
				{ id: 'popular', label: 'Popular' },
				{ id: 'motion', label: 'Motion' },
				{ id: 'blocks', label: 'UI Blocks' }
			]}
			bind:activeId={topNavActive}
		/>
	</div>
</ComponentDoc>
