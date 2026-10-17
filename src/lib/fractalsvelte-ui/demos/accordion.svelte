<script lang="ts">
	import { Accordion } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-lg">
	<Accordion
		items={[
			{
				id: '1',
				title: 'Why zero Tailwind?',
				content:
					'Pure scoped CSS provides zero build overhead, 100% style isolation, and instant runtime theme switching via custom properties.'
			},
			{
				id: '2',
				title: 'How does the AST doc pipeline work?',
				content:
					'A TypeScript AST scanner extracts props, types, and defaults with zero human maintenance, verified by a strict drift gate.'
			},
			{
				id: '3',
				title: 'Can I use this with SvelteKit 3?',
				content:
					'Yes! Fractal UI is engineered specifically for SvelteKit 3 with full SSR and static generation compatibility.'
			}
		]}
	/>
</div>
