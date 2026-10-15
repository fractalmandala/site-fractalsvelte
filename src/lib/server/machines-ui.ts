// Page data for the live machines-ui docs. API rows come from the library's own docs
// extractor (src/docs/data/components.json, copied by `pnpm docs:copy`); each example's
// code is the markup inside one <Example> block of the page's own +page.svelte.
import { error } from '@sveltejs/kit';
import machinesUi from '#lib/generated/components/machines-ui.json';
import { BASE, PACKAGE, families, type CodeSample } from '#lib/machines-ui/catalog.js';
import { GITHUB } from '#lib/site.js';
import { clamp, fitTitle, softwareId, techArticle, type Seo } from '#lib/seo.js';
import type { TocEntry } from '#lib/content.js';
import type { ApiProp } from './components';
import { highlightCode } from './highlight';

type MachineProp = {
	name: string;
	type?: string;
	optional?: boolean;
	default?: string;
	description?: string;
	values?: string[];
	only?: string[];
	snippet?: boolean;
	callback?: boolean;
};
type MachineComponent = {
	name: string;
	displayName: string;
	slug: string;
	family: string;
	file: string;
	exported: boolean;
	description: string;
	props: MachineProp[];
	moduleTypes: { name: string; kind: string; definition?: string; doc?: string }[];
	uses: string[];
	tokens: string[];
	motion: { animatedProp: boolean; reveal: boolean; reducedMotion: boolean };
};

const all = ((machinesUi as { components?: unknown }).components ??
	machinesUi) as MachineComponent[];

const pageSources = Object.fromEntries(
	Object.entries(
		import.meta.glob<string>('/src/routes/machines-ui/*/+page.svelte', {
			query: '?raw',
			import: 'default',
			eager: true
		})
	).map(([path, source]) => [path.split('/').at(-2)!, source])
);

const sample = (code: string, lang: string): CodeSample => ({
	code,
	html: highlightCode(code, lang)
});

/** Each <Example> block's markup, dedented, in page order. */
function examples(source: string) {
	return [...source.matchAll(/^\t<Example>\n([\s\S]*?)\n\t<\/Example>$/gm)].map((m) =>
		sample(m[1].replace(/^\t\t/gm, ''), 'svelte')
	);
}

/** What the examples need besides markup: the imports and any data helpers. */
function helpers(source: string) {
	const script = source.match(/<script lang="ts">\n([\s\S]*?)<\/script>/)?.[1] ?? '';
	const body = script
		.split('\n')
		.filter(
			(l) =>
				!l.includes("from '#lib/machines-ui/") &&
				!l.includes("from './$types'") &&
				!l.includes('let { data }: PageProps = $props();')
		)
		.join('\n')
		.replace(/^\t/gm, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	// only worth showing when there is more than the import line
	return body.includes('\n')
		? sample(`<script lang="ts">\n${body.replace(/^/gm, '\t')}\n</script>`, 'svelte')
		: null;
}

const order = families.map((f) => f.id as string);
const familyLabel = (id: string) => families.find((f) => f.id === id)?.label ?? id;

/** Every exported component that has a page, in catalogue order (FlowCanvas leads Flow) */
export const components = all
	.filter((c) => c.exported && pageSources[c.slug])
	.toSorted(
		(a, b) =>
			order.indexOf(a.family) - order.indexOf(b.family) ||
			Number(b.name === 'FlowCanvas') - Number(a.name === 'FlowCanvas') ||
			a.displayName.localeCompare(b.displayName)
	);

export const groups = families
	.map((f) => ({
		id: f.id,
		label: f.label,
		components: components
			.filter((c) => c.family === f.id)
			.map(({ displayName, slug, description }) => ({ name: displayName, slug, description }))
	}))
	.filter((g) => g.components.length);

const row = (p: MachineProp): ApiProp => ({
	name: p.name,
	type: p.type ?? 'unknown',
	default: p.default ?? null,
	description:
		[
			p.optional === false ? 'Required.' : '',
			p.only?.length ? `Only the ${p.only.join(' and ')} look.` : '',
			p.description ?? ''
		]
			.filter(Boolean)
			.join(' ') || null,
	bindable: false,
	optional: p.optional ?? true,
	values: p.values?.length ? p.values.join(' | ') : null
});

function machinePage(slug: string) {
	const index = components.findIndex((c) => c.slug === slug);
	if (index < 0) return undefined;
	const c = components[index];
	const source = pageSources[slug];
	const importCode = `import '${PACKAGE}/style.css';\nimport { ${c.name} } from '${PACKAGE}';`;
	const link = (x?: MachineComponent) => (x ? { name: x.displayName, slug: x.slug } : undefined);
	const notes = [
		c.motion.animatedProp && 'Runs live; set animated={false} to freeze it.',
		c.motion.reveal && 'Reveals itself when scrolled into view.',
		c.motion.reducedMotion && 'Honours prefers-reduced-motion.',
		c.props.some((p) => p.name === 'class') && 'class is forwarded to the outer element.'
	].filter((n): n is string => !!n);

	return {
		name: c.name,
		displayName: c.displayName,
		slug,
		family: c.family,
		familyLabel: familyLabel(c.family),
		description: c.description,
		import: sample(importCode, 'ts'),
		examples: examples(source),
		helpers: helpers(source),
		props: c.props.filter((p) => !p.snippet && !p.callback).map(row),
		snippets: c.props.filter((p) => p.snippet || p.callback).map(row),
		notes,
		types: c.moduleTypes,
		tokens: c.tokens,
		used: c.uses.flatMap((name) => {
			const x = components.find((y) => y.name === name);
			return x ? [{ name: x.displayName, slug: x.slug }] : [];
		}),
		usedBy: components
			.filter((x) => x.uses.includes(c.name))
			.map((x) => ({ name: x.displayName, slug: x.slug })),
		sourceUrl: `${GITHUB}/machines-ui/blob/main/${c.file}`,
		previous: link(components[index - 1]),
		next: link(components[index + 1]),
		path: `${BASE}/${slug}`
	};
}

export type MachinePage = NonNullable<ReturnType<typeof machinePage>>;

/** The load every /machines-ui/<slug>/+page.server.ts re-exports; the slug is its folder. */
export function load({ route }: { route: { id: string | null } }) {
	const slug = route.id?.split('/').at(-1) ?? '';
	const component = machinePage(slug);
	if (!component) error(404, `No machines-ui component for “${slug}”`);

	const seo: Seo = {
		title: fitTitle(
			`${component.displayName} — live Svelte 5 component · machines-ui`,
			`${component.displayName} — Svelte 5 component · machines-ui`,
			`${component.displayName} · machines-ui`
		),
		description: clamp(`${component.displayName} for Svelte 5, live. ${component.description}`),
		path: component.path,
		imageAlt: `${component.displayName}, a Svelte 5 component from machines-ui`,
		type: 'article',
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: 'machines-ui', path: BASE },
			{ name: component.displayName, path: component.path }
		]
	};
	seo.jsonLd = [techArticle(seo, softwareId(BASE))];

	// mirrors the sections MachineDoc renders, for the right rail
	const c = component;
	const toc: TocEntry[] = [
		{ depth: 2, id: 'import', text: 'Import' },
		{ depth: 2, id: 'examples', text: `Examples (${c.examples.length})` },
		...(c.props.length ? [{ depth: 2, id: 'props', text: 'Props' }] : []),
		...(c.snippets.length ? [{ depth: 2, id: 'snippets', text: 'Snippets & callbacks' }] : []),
		...(c.notes.length ? [{ depth: 2, id: 'behaviour', text: 'Behaviour' }] : []),
		...(c.types.length ? [{ depth: 2, id: 'types', text: 'Exported types' }] : []),
		...(c.tokens.length ? [{ depth: 2, id: 'theming', text: 'Theming' }] : []),
		...(c.used.length || c.usedBy.length ? [{ depth: 2, id: 'related', text: 'Related' }] : [])
	];

	return { seo: seo as Seo & { breadcrumbs: NonNullable<Seo['breadcrumbs']> }, component, toc };
}
