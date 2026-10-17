<script lang="ts">
	import { TopNav } from '@fractaldesign/fractalsvelte-ui';

	let topNavActive = $state('popular');
</script>

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
