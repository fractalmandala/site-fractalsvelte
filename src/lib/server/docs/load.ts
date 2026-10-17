// The three loads every doc-set route re-exports, plus the prerender entries. One
// implementation for every library: a set's routes only name the set.
import { error } from '@sveltejs/kit';
import {
	absolute,
	clamp,
	fitTitle,
	itemList,
	softwareId,
	techArticle,
	type Crumb,
	type Seo
} from '#lib/seo.js';
import type { TocEntry } from '#lib/content.js';
import { componentSections } from '#lib/docs/sections.js';
import type { Code, CodeSample } from '#lib/docs/examples.js';
import type { DocSet } from '#lib/docs/model.js';
import { highlightCode } from '../highlight.js';
import { demoSource } from './demo-sources.js';
import { getSet, navFor, resolveComponent } from './registry.js';

type LoadEvent = { params: Record<string, string> };
const code = (text: string, lang: string): Code => ({
	code: text,
	html: highlightCode(text, lang)
});

/** The left-rail tree and the set's own metadata, for the layout. */
export function setLayoutLoad(setId: string) {
	return () => {
		const set = getSet(setId);
		if (!set) error(404, `Unknown documentation set “${setId}”`);
		return {
			set: { id: set.id, base: set.base, title: set.title, intro: set.intro },
			nav: navFor(set)
		};
	};
}

function indexSeo(set: DocSet): Seo {
	const count = set.components.length;
	const seo: Seo = {
		title: `${set.title} — ${count} live Svelte 5 components`,
		description: clamp(
			`Live documentation for all ${count} ${set.title} components: interactive previews, variants, props, snippets and copy-paste Svelte 5 examples.`
		),
		path: set.base,
		imageAlt: `${count} live Svelte 5 components in ${set.title}`,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: set.title, path: set.base }
		]
	};
	seo.jsonLd = [
		{
			'@type': 'CollectionPage',
			name: `${set.title} components`,
			url: absolute(set.base),
			about: { '@id': softwareId(set.base) },
			mainEntity: itemList(
				set.components.map((c) => ({ name: c.displayName, path: `${set.base}/${c.slug}` }))
			)
		}
	];
	return seo;
}

/** The doc set's index: setup, the component catalogue and its groups. */
export function setIndexLoad(setId: string) {
	return () => {
		const set = getSet(setId);
		if (!set) error(404, `Unknown documentation set “${setId}”`);
		const toc: TocEntry[] = [
			{ depth: 2, id: 'setup', text: 'Set up' },
			{ depth: 2, id: 'components', text: 'Components' },
			...set.groups.map((g) => ({
				depth: 3,
				id: g.id,
				text: `${g.label} (${set.components.filter((c) => c.group === g.id).length})`
			}))
		];
		return {
			set: { id: set.id, base: set.base, title: set.title, intro: set.intro, package: set.package },
			total: set.components.length,
			groups: set.groups.map((g) => ({
				id: g.id,
				label: g.label,
				components: set.components
					.filter((c) => c.group === g.id)
					.map((c) => ({ name: c.displayName, slug: c.slug, description: c.description }))
			})),
			toc,
			seo: indexSeo(set),
			install: code(set.install, 'sh'),
			setup: code(set.setup, 'svelte'),
			use: code(set.use, 'svelte')
		};
	};
}

/** Each `<Example>` block's markup, dedented, in source order (machines-ui demos). */
function exampleBlocks(source: string): string[] {
	return [...source.matchAll(/<Example>\n([\s\S]*?)\n<\/Example>/g)].map((m) =>
		m[1].replace(/^\t/gm, '')
	);
}

/** What a demo needs besides markup: its imports and any data helpers. */
function helperScript(source: string): string | null {
	const script = source.match(/<script lang="ts">\n([\s\S]*?)<\/script>/)?.[1] ?? '';
	const body = script
		.split('\n')
		.filter((l) => !/^\s*import\b/.test(l))
		.join('\n')
		.replace(/^\t/gm, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	return body || null;
}

/** A component page: the resolved component, its pre-highlighted code and its TOC. */
export function componentLoad(setId: string) {
	return ({ params }: LoadEvent) => {
		const set = getSet(setId);
		if (!set) error(404, `Unknown documentation set “${setId}”`);
		const component = resolveComponent(set, params.name);
		if (!component) error(404, `No ${set.title} component for “${params.name}”`);

		const raw = demoSource(setId, component.slug) ?? '';
		const samples: CodeSample[] = exampleBlocks(raw).map(
			(block) => code(block, 'svelte') as CodeSample
		);
		const helpers = helperScript(raw);

		// fractalsvelte-ui/fstyled demos show their own source as Usage; machines-ui
		// shows its authored examples and prints each <Example>'s markup inline.
		const usesDemo = component.source !== null || set.id !== 'machines-ui';
		const usage = usesDemo && raw ? code(raw, 'svelte') : null;
		const manifestExamples = component.examples.map((e) => code(e, 'svelte'));
		const hasExamples =
			manifestExamples.length > 0 &&
			(!usage || usage.code.trim() !== component.examples.join('\n').trim());

		const toc = componentSections(component, {
			usage: !!usage || manifestExamples.length > 0,
			examples: hasExamples
		});

		const seo: Seo = {
			title: fitTitle(
				`${component.displayName} — live Svelte 5 component · ${set.title}`,
				`${component.displayName} — Svelte 5 component · ${set.title}`
			),
			description: clamp(
				`${component.displayName} for Svelte 5 and SvelteKit, live. ${component.description}`
			),
			path: component.path,
			imageAlt: `${component.displayName}, a Svelte 5 component from ${set.title}`,
			type: 'article',
			breadcrumbs: [
				{ name: 'fractalsvelte', path: '/' },
				{ name: set.title, path: set.base },
				{ name: component.displayName, path: component.path }
			] as Crumb[]
		};
		seo.jsonLd = [techArticle(seo, softwareId(set.base))];

		return {
			setId: set.id,
			set: {
				id: set.id,
				base: set.base,
				title: set.title,
				package: set.package,
				wrapPreview: set.wrapPreview
			},
			component,
			import: component.importSnippet ? code(component.importSnippet, 'ts') : null,
			usage,
			examples: hasExamples ? manifestExamples : [],
			samples,
			helpers: helpers ? code(helpers, 'svelte') : null,
			source: component.source ? code(component.source.code, 'svelte') : null,
			toc,
			seo: seo as Seo & { breadcrumbs: Crumb[] }
		};
	};
}

/** Every component in the set, so the dynamic route prerenders. */
export function componentEntries(setId: string) {
	return () => (getSet(setId)?.components ?? []).map((c) => ({ name: c.slug }));
}

export type ComponentPageData = ReturnType<ReturnType<typeof componentLoad>>;
export type SetIndexData = ReturnType<ReturnType<typeof setIndexLoad>>;
export type SetLayoutData = ReturnType<ReturnType<typeof setLayoutLoad>>;
