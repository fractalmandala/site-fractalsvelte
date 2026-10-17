<script lang="ts">
	import { CardStack } from '@fractaldesign/fractalsvelte-ui/styler';

	let activeIndex = $state(0);
</script>

<div class="box gap-sm wfull">
	<CardStack
		bind:activeIndex
		items={[
			{
				id: 'c1',
				title: 'First card',
				description: 'Swipe, use the arrows, or the arrow keys.',
				badge: 'New'
			},
			{ id: 'c2', title: 'Second card', description: 'Cards behind show as inset edges.' },
			{ id: 'c3', title: 'Third card' }
		]}
	/>
	<p class="text-body-sm text-secondary ta-c">Card {activeIndex + 1} of 3</p>
</div>
