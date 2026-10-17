<script lang="ts">
	import { BottomNav } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luHouse, luSearch, luBell } from 'fractalicons/lucide';

	let activeId = $state('home');
</script>

<div class="wfull border radius-md">
	{#snippet homeIcon()}<Icon icon={luHouse} />{/snippet}
	{#snippet searchIcon()}<Icon icon={luSearch} />{/snippet}
	{#snippet bellIcon()}<Icon icon={luBell} />{/snippet}
	<BottomNav
		bind:activeId
		items={[
			{ id: 'home', label: 'Home', icon: homeIcon },
			{ id: 'search', label: 'Search', icon: searchIcon },
			{ id: 'alerts', label: 'Alerts', badge: 3, icon: bellIcon }
		]}
	/>
</div>
