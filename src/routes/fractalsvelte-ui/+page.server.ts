import { BASE } from '#lib/fractalsvelte-ui/catalog.js';
import { components, groups } from '#lib/server/fractalsvelte-ui.js';
import { absolute, itemList, softwareId, type Seo } from '#lib/seo.js';
import { highlightCode } from '#lib/server/highlight.js';
import type { TocEntry } from '#lib/content.js';
import type { PageServerLoad } from './$types';

const setup = `<script>
	// once, in src/routes/+layout.svelte
	import '@fractaldesign/fractalsvelte-ui/tokens.css';
	let { children } = $props();
</script>

{@render children()}`;

const install = 'pnpm add @fractaldesign/fractalsvelte-ui';

const use = `<script>
	import { Button, Badge } from '@fractaldesign/fractalsvelte-ui';
</script>

<Button variant="primary">Deploy</Button>
<Badge variant="success">Live</Badge>`;

export const load: PageServerLoad = () => {
	const seo: Seo = {
		title: `fractalsvelte-ui — ${components.length} live Svelte 5 components`,
		description: `Live documentation for all ${components.length} fractalsvelte-ui components: interactive previews, variants, props, snippets and copy-paste Svelte 5 examples.`,
		path: BASE,
		imageAlt: `${components.length} live Svelte 5 components in fractalsvelte-ui`,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: 'fractalsvelte-ui', path: BASE }
		],
		jsonLd: [
			{
				'@type': 'CollectionPage',
				name: 'fractalsvelte-ui components',
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
