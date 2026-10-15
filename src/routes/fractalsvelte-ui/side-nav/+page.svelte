<script lang="ts">
	import { SideNav } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let sideNavActive = $state('actions');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm fs-stage-md bg-surface border radius-sm">
		<SideNav
			items={[
				{ id: 'intro', label: 'Introduction', group: 'Getting Started' },
				{ id: 'tokens', label: 'Tokens CSS', group: 'Getting Started' },
				{ id: 'actions', label: 'Actions', group: 'Components', badge: '8' },
				{ id: 'forms', label: 'Forms', group: 'Components', badge: '16' },
				{ id: 'motion', label: 'Motion', group: 'Components', badge: '13' }
			]}
			bind:activeId={sideNavActive}
		/>
	</div>
</ComponentDoc>
