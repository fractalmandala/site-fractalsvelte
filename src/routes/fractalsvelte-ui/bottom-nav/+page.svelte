<script lang="ts">
	import { BottomNav } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let bottomNavActive = $state('home');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm border radius-lg bg-surface shadow-md">
		<div class="box xcenter gap-xs pad-lg ta-c">
			<h4 class="card-title text-primary">Mobile tab bar</h4>
			<p class="text-body-sm text-muted">Active: <strong>{bottomNavActive}</strong></p>
		</div>
		<BottomNav
			items={[
				{ id: 'home', label: 'Home' },
				{ id: 'search', label: 'Search' },
				{ id: 'activity', label: 'Activity', badge: '4' },
				{ id: 'profile', label: 'Profile' }
			]}
			bind:activeId={bottomNavActive}
		/>
	</div>
</ComponentDoc>
