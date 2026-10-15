// Page data for the live fractalsvelte-ui docs. API rows come from the library's AST
// manifest (via ./components); the usage example is the demo inside each page's own
// +page.svelte — its script minus the docs wiring, and the markup inside <ComponentDoc>.
import { error } from '@sveltejs/kit';
import manifest from '#lib/generated/components/fractalsvelte-ui.json';
import { BASE, PACKAGE, categories, slug } from '#lib/fractalsvelte-ui/catalog.js';
import { clamp, fitTitle, softwareId, techArticle, type Seo } from '#lib/seo.js';
import type { TocEntry } from '#lib/content.js';
import { libraries, type ApiProp } from './components';
import { highlightCode } from './highlight';

const pageSources = Object.fromEntries(
	Object.entries(
		import.meta.glob<string>('/src/routes/fractalsvelte-ui/*/+page.svelte', {
			query: '?raw',
			import: 'default',
			eager: true
		})
	).map(([path, source]) => [path.split('/').at(-2)!, source])
);

/** The demo as a reader would write it: no ComponentDoc, no page data. */
function usage(source: string) {
	const script = source.match(/<script lang="ts">\n([\s\S]*?)<\/script>/)?.[1] ?? '';
	const kept = script
		.split('\n')
		.filter(
			(l) =>
				!l.includes("from '#lib/fractalsvelte-ui/ComponentDoc.svelte'") &&
				!l.includes("from './$types'") &&
				!l.includes('let { data }: PageProps = $props();')
		)
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trimEnd();
	const open = source.indexOf('>', source.indexOf('<ComponentDoc')) + 1;
	const markup = source
		.slice(open, source.lastIndexOf('</ComponentDoc>'))
		.replace(/^\n/, '')
		.trimEnd()
		.replace(/^\t/gm, '');
	return `<script lang="ts">\n${kept}\n</script>\n\n${markup}\n`;
}

const order = categories.map((c) => c.id as string);
const label = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

/** Every component that has a page, in catalogue order */
export const components = libraries['fractalsvelte-ui'].components
	.filter((c) => pageSources[slug(c.name)])
	.toSorted(
		(a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.name.localeCompare(b.name)
	);

export const groups = categories
	.map((c) => ({
		id: c.id,
		label: c.label,
		components: components
			.filter((x) => x.group === c.id)
			.map(({ name, description }) => ({ name, slug: slug(name), description }))
	}))
	.filter((g) => g.components.length);

export type Variant = { name: string; values: string[]; default: string | null };

/** String-literal values of a union: "'sm' | 'md'" → ['sm', 'md'] */
const literals = (type: string | null) =>
	type && /^\s*'[^']*'(\s*\|\s*'[^']*')+\s*$/.test(type)
		? [...type.matchAll(/'([^']*)'/g)].map((m) => m[1])
		: [];

/** Props whose type is a closed set of strings: variant, size, shape, placement… */
function variants(props: ApiProp[]): Variant[] {
	return props.flatMap((p) => {
		const named = literals(p.values);
		const values = named.length ? named : literals(p.type.replace(/\s*\|\s*undefined\b/g, ''));
		return values.length > 1
			? [{ name: p.name, values, default: p.default?.replace(/^['"]|['"]$/g, '') ?? null }]
			: [];
	});
}

function componentPage(pageSlug: string) {
	const index = components.findIndex((c) => slug(c.name) === pageSlug);
	if (index < 0) return undefined;
	const c = components[index];
	const raw = manifest.components.find((m) => m.name === c.name)!;
	const demo = usage(pageSources[pageSlug]);
	const importLine = `import { ${c.name} } from '${PACKAGE}';`;
	const link = (x?: (typeof components)[number]) =>
		x ? { name: x.name, slug: slug(x.name) } : undefined;

	return {
		name: c.name,
		slug: pageSlug,
		group: c.group,
		groupLabel: label(c.group),
		description: c.description,
		file: raw.file.replace(/^src\/lib\//, ''),
		import: { code: importLine, html: highlightCode(importLine, 'ts') },
		usage: { code: demo, html: highlightCode(demo, 'svelte') },
		variants: variants(c.props),
		props: c.props,
		snippets: c.snippets,
		extends: c.extends,
		types: raw.types as { name: string; definition: string }[],
		source: c.source && { code: c.source, html: highlightCode(c.source, 'svelte') },
		sourceUrl: c.sourceUrl,
		previous: link(components[index - 1]),
		next: link(components[index + 1]),
		path: `${BASE}/${pageSlug}`
	};
}

export type ComponentPage = NonNullable<ReturnType<typeof componentPage>>;

/** The load every /fractalsvelte-ui/<slug>/+page.server.ts re-exports; the slug is its folder. */
export function load({ route }: { route: { id: string | null } }) {
	const pageSlug = route.id?.split('/').at(-1) ?? '';
	const component = componentPage(pageSlug);
	if (!component) error(404, `No fractalsvelte-ui component for “${pageSlug}”`);

	const seo: Seo = {
		title: fitTitle(
			`${component.name} — live Svelte 5 component · fractalsvelte-ui`,
			`${component.name} — Svelte 5 component · fractalsvelte-ui`
		),
		description: clamp(
			`${component.name} for Svelte 5 and SvelteKit, live. ${component.description}`
		),
		path: component.path,
		imageAlt: `${component.name}, a Svelte 5 component from fractalsvelte-ui`,
		type: 'article',
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: 'fractalsvelte-ui', path: BASE },
			{ name: component.name, path: component.path }
		]
	};
	seo.jsonLd = [techArticle(seo, softwareId(BASE))];

	// mirrors the sections ComponentDoc renders, for the right rail
	const toc: TocEntry[] = [
		{ depth: 2, id: 'import', text: 'Import' },
		{ depth: 2, id: 'preview', text: 'Preview' },
		{ depth: 2, id: 'usage', text: 'Usage' },
		...(component.variants.length ? [{ depth: 2, id: 'variants', text: 'Variants' }] : []),
		{ depth: 2, id: 'props', text: 'Props' },
		...(component.snippets.length ? [{ depth: 2, id: 'snippets', text: 'Snippets' }] : []),
		...(component.types.length ? [{ depth: 2, id: 'types', text: 'Exported types' }] : []),
		...(component.source ? [{ depth: 2, id: 'source', text: 'Source' }] : [])
	];

	return { seo: seo as Seo & { breadcrumbs: NonNullable<Seo['breadcrumbs']> }, component, toc };
}
