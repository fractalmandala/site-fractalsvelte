import { highlightSnippets } from '#lib/server/highlight.js';
import { itemList, softwareId, type Seo } from '#lib/seo.js';
import { projects } from '#lib/site.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const seo: Seo = {
		title: 'fractalsvelte — Svelte 5 components, styling & highlighting',
		description: `open-source packages for Svelte 5 and SvelteKit: a 124-component UI library, ASCII graphs and diagrams, a CSS styling system and a syntax highlighter.`,
		path: '/',
		imageAlt: 'fractalsvelte: Svelte 5 and SvelteKit packages',
		jsonLd: [
			{
				...itemList(projects.map((p) => ({ name: p.slug, path: `/${p.slug}` }))),
				name: 'fractalsvelte packages'
			},
			...projects.map((p) => ({
				'@type': 'SoftwareSourceCode',
				'@id': softwareId(`/${p.slug}`)
			}))
		]
	};

	return {
		seo,
		// One representative snippet per project, highlighted at build time.
		starters: projects.map((p) => ({
			slug: p.slug
		}))
	};
};
