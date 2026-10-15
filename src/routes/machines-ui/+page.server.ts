import { BASE, PACKAGE } from '#lib/machines-ui/catalog.js';
import { components, groups } from '#lib/server/machines-ui.js';
import { absolute, itemList, softwareId, type Seo } from '#lib/seo.js';
import { highlightCode } from '#lib/server/highlight.js';
import type { TocEntry } from '#lib/content.js';
import type { PageServerLoad } from './$types';

const install = `pnpm add ${PACKAGE}`;

const setup = `<script>
	// once, in src/routes/+layout.svelte
	import '${PACKAGE}/style.css';
	let { children } = $props();
</script>

{@render children()}`;

const use = `<script>
	import { GraphSpark } from '${PACKAGE}';
</script>

<GraphSpark title="LATENCY" data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]} />`;

export const load: PageServerLoad = () => {
	const seo: Seo = {
		title: `machines-ui — ${components.length} live Svelte 5 components`,
		description: `Live docs for all ${components.length} machines-ui components: character-drawn graphs, animated terminals, diagrams and a workflow canvas, with props and examples.`,
		path: BASE,
		imageAlt: `${components.length} live Svelte 5 components in machines-ui`,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: 'machines-ui', path: BASE }
		],
		jsonLd: [
			{
				'@type': 'CollectionPage',
				name: 'machines-ui components',
				url: absolute(BASE),
				about: { '@id': softwareId(BASE) },
				mainEntity: itemList(
					groups.flatMap((g) =>
						g.components.map((c) => ({ name: c.name, path: `${BASE}/${c.slug}` }))
					)
				)
			}
		]
	};

	const toc: TocEntry[] = [
		{ depth: 2, id: 'setup', text: 'Set up' },
		{ depth: 2, id: 'components', text: 'Components' },
		...groups.map((g) => ({ depth: 3, id: g.id, text: `${g.label} (${g.components.length})` }))
	];

	return {
		seo,
		toc,
		total: components.length,
		groups,
		install: { code: install, html: highlightCode(install, 'sh') },
		setup: { code: setup, html: highlightCode(setup, 'svelte') },
		use: { code: use, html: highlightCode(use, 'svelte') }
	};
};
