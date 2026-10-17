<script lang="ts">
	import { CardStack } from '@fractaldesign/fractalsvelte-ui';

	let cardStackIdx = $state(0);
</script>

<div class="box gap-md wfull">
	<CardStack
		bind:activeIndex={cardStackIdx}
		items={[
			{
				id: 'c1',
				badge: 'PROPRIETARY',
				title: 'Quantum Runes Engine',
				description: 'Zero-overhead reactive primitives natively compiled by Svelte 5.'
			},
			{
				id: 'c2',
				badge: 'ZERO DEPS',
				title: 'Pure Web Animations',
				description: 'Fluid spring physics and transitions without GSAP or Motion bloat.'
			},
			{
				id: 'c3',
				badge: 'TOKEN SCALE',
				title: 'Precision Theming',
				description: 'Instantaneous style pivoting across 5 enterprise design system looks.'
			},
			{
				id: 'c4',
				badge: 'ZERO DRIFT',
				title: 'AST Manifest Gate',
				description: 'Continuous documentation synchronization directly from AST source.'
			}
		]}
	/>
</div>
