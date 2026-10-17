<script lang="ts">
	import { BottomNav } from '@fractaldesign/fractalsvelte-ui';

	let bottomNavActive = $state('home');
</script>

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
