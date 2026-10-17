// The doc-set registry: one entry per library that gets live documentation on the
// site. Adding a library is (1) copy its manifest with scripts/copy-docs.ts, (2) add
// a config below, (3) scaffold its routes with scripts/scaffold-docset.ts. Nothing
// about the routes or the rendering is written per component.
import fractalsvelteManifest from '#lib/generated/components/fractalsvelte-ui.json';
import stylerManifest from '#lib/generated/components/fractalsvelte-ui-styler.json';
import machinesManifest from '#lib/generated/components/machines-ui.json';
import sharedUnions from '#lib/generated/components/fractalsvelte-ui.types.json';
import { categories } from '#lib/fractalsvelte-ui/catalog.js';
import { families } from '#lib/machines-ui/catalog.js';
import { GITHUB } from '#lib/site.js';
import {
	humanize,
	kebab,
	label,
	type DocComponent,
	type DocGroup,
	type DocLink,
	type DocProp,
	type DocSet,
	type DocType,
	type ResolvedComponent
} from '#lib/docs/model.js';

// ── raw manifest shapes (only what the adapters read) ──────────────────────────
type FractalProp = {
	name: string;
	type: string;
	optional: boolean;
	default: string | null;
	bindable: boolean;
	description: string | null;
};
type FractalComponent = {
	name: string;
	category: string;
	file: string;
	description: string;
	importSnippet: string;
	usageSnippet: string;
	extends: { base: string | null; omit?: string[] } | null;
	props: FractalProp[];
	snippets: FractalProp[];
	types: { name: string; definition: string }[];
	code: string;
};
type FractalManifest = { components: FractalComponent[] };

type MachineProp = {
	name: string;
	type?: string;
	optional?: boolean;
	default?: string;
	description?: string;
	values?: string[];
	only?: string[];
	refs?: string[];
	alias?: string;
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
	examples?: string[];
	props: MachineProp[];
	moduleTypes?: { name: string; kind: string; definition?: string; doc?: string }[];
	slots?: { name: string; props?: string }[];
	uses?: string[];
	classes?: string[];
	tokens?: string[];
	motion?: { animatedProp?: boolean; reveal?: boolean; reducedMotion?: boolean };
	hasChildren?: boolean;
	renames?: Record<string, string>;
	hasPreview?: boolean;
};
type MachineManifest = { components: MachineComponent[] };

/** String-literal values of a union derived from the shared `as const` arrays. */
const unions = sharedUnions as Record<string, string>;
function unionTypeValues(type: string, localTypes: { name: string; definition: string }[]) {
	const own = Object.fromEntries(localTypes.map((t) => [t.name, t.definition]));
	const names = type.match(/\b[A-Z]\w*\b/g)?.filter((n) => unions[n] || own[n]) ?? [];
	const defs = [...new Set(names.map((n) => unions[n] ?? own[n]))];
	return defs.length ? defs.join(' | ') : null;
}
const literals = (values: string | null | undefined) =>
	values && /^\s*'[^']*'(\s*\|\s*'[^']*')+\s*$/.test(values)
		? [...values.matchAll(/'([^']*)'/g)].map((m) => m[1])
		: null;

// ── adapters: manifest → DocComponent ─────────────────────────────────────────
function prop(p: FractalProp, values: string | null): DocProp {
	return {
		name: p.name,
		type: p.type,
		default: p.default,
		optional: p.optional,
		description: p.description,
		values: literals(values),
		bindable: p.bindable,
		kind: 'prop',
		only: null,
		refs: null,
		alias: null
	};
}

function fromFractalsvelte(raw: FractalManifest, repo: string): DocComponent[] {
	return raw.components
		.map((c) => ({
			slug: kebab(c.name),
			name: c.name,
			displayName: humanize(c.name),
			group: c.category,
			description: c.description,
			importSnippet: c.importSnippet,
			examples: c.usageSnippet?.trim() ? [c.usageSnippet.trim()] : [],
			props: c.props.map((p) => prop(p, unionTypeValues(p.type, c.types ?? []))),
			snippets: c.snippets.map((p) => ({
				...prop(p, unionTypeValues(p.type, c.types ?? [])),
				kind: 'snippet' as const
			})),
			types: (c.types ?? []).map<DocType>((t) => ({
				name: t.name,
				kind: 'type',
				definition: t.definition,
				doc: null
			})),
			extends: c.extends?.base ? { base: c.extends.base, omit: c.extends.omit ?? [] } : null,
			tokens: [],
			classes: [],
			renames: {},
			motion: null,
			hasChildren: false,
			hasPreview: true,
			uses: [],
			source: c.code ? { code: c.code, file: c.file } : null,
			file: c.file,
			slots: []
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

function machineProp(p: MachineProp, kind: DocProp['kind']): DocProp {
	return {
		name: p.name,
		type: p.type ?? 'unknown',
		default: p.default ?? null,
		optional: p.optional ?? true,
		description:
			[
				p.optional === false ? 'Required.' : '',
				p.only?.length ? `Only the ${p.only.join(' and ')} look.` : '',
				p.description ?? ''
			]
				.filter(Boolean)
				.join(' ') || null,
		values: p.values?.length ? p.values : null,
		bindable: false,
		kind,
		only: p.only?.length ? p.only : null,
		refs: p.refs?.length ? p.refs : null,
		alias: p.alias ?? null
	};
}

function fromMachines(raw: MachineManifest, pkg: string): DocComponent[] {
	return raw.components
		.filter((c) => c.exported)
		.map((c) => ({
			slug: c.slug,
			name: c.name,
			displayName: humanize(c.displayName),
			group: c.family,
			description: c.description,
			importSnippet: `import '${pkg}/style.css';\nimport { ${c.name} } from '${pkg}';`,
			examples: c.examples ?? [],
			props: c.props.filter((p) => !p.snippet && !p.callback).map((p) => machineProp(p, 'prop')),
			snippets: c.props
				.filter((p) => p.snippet || p.callback)
				.map((p) => machineProp(p, p.callback ? 'callback' : 'snippet')),
			types: (c.moduleTypes ?? []).map<DocType>((t) => ({
				name: t.name,
				kind: t.kind,
				definition: t.definition ?? null,
				doc: t.doc ?? null
			})),
			extends: null,
			tokens: c.tokens ?? [],
			classes: c.classes ?? [],
			renames: c.renames ?? {},
			motion: c.motion
				? {
						animatedProp: !!c.motion.animatedProp,
						reveal: !!c.motion.reveal,
						reducedMotion: !!c.motion.reducedMotion
					}
				: null,
			hasChildren: !!c.hasChildren,
			hasPreview: !!c.hasPreview,
			uses: c.uses ?? [],
			source: null,
			file: c.file,
			slots: (c.slots ?? []).map((s) => ({ name: s.name, props: s.props ?? null }))
		}))
		.sort((a, b) => a.group.localeCompare(b.group) || a.displayName.localeCompare(b.displayName));
}

// ── set configs ───────────────────────────────────────────────────────────────
type SetConfig = {
	id: string;
	base: string;
	title: string;
	pkg: string;
	repo: string;
	intro: string;
	order: DocGroup[];
	install: string;
	setup: string;
	use: string;
	wrapPreview: boolean;
	components: DocComponent[];
};

const fractalGroups: DocGroup[] = categories.map((c) => ({ id: c.id, label: c.label }));
const machineGroups: DocGroup[] = families.map((f) => ({ id: f.id, label: f.label }));

const GITHUB_BASE = `${GITHUB}/`;

const fractalsvelteSetup = `<script>
	// once, in src/routes/+layout.svelte
	import '@fractaldesign/fractalsvelte-ui/tokens.css';
	let { children } = $props();
</script>

{@render children()}`;

const fractalsvelteUse = `<script>
	import { Button, Badge } from '@fractaldesign/fractalsvelte-ui';
</script>

<Button variant="primary">Deploy</Button>
<Badge variant="success">Live</Badge>`;

const stylerSetup = `<script lang="ts">
	// once, in src/routes/+layout.svelte
	import '@fractaldesign/fractalstyler/css';
	import { modeState } from '@fractaldesign/fractalsvelte-ui/styler';
	let { children } = $props();
	// fractalstyler defines its tokens under [data-mode="light" | "dark"] only
	$effect(() => modeState.init());
</script>

{@render children()}`;

const stylerUse = `<script>
	import { Button, Badge } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<Button variant="primary" size="lg">Deploy</Button>
<Badge variant="success" dot>Live</Badge>`;

const machinesSetup = `<script>
	// once, in src/routes/+layout.svelte
	import '@fractaldesign/machines-ui/style.css';
	let { children } = $props();
</script>

{@render children()}`;

const machinesUse = `<script>
	import { GraphSpark } from '@fractaldesign/machines-ui';
</script>

<GraphSpark title="LATENCY" data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]} />`;

const SETS: SetConfig[] = [
	{
		id: 'fractalsvelte-ui',
		base: '/fractalsvelte-ui',
		title: 'fractalsvelte-ui',
		pkg: '@fractaldesign/fractalsvelte-ui',
		repo: 'fractalsvelte-ui',
		intro:
			'Svelte 5 components, each rendered live from the published package — with its variants, props, snippets and the exact code behind every preview.',
		order: fractalGroups,
		install: 'pnpm add @fractaldesign/fractalsvelte-ui',
		setup: fractalsvelteSetup,
		use: fractalsvelteUse,
		wrapPreview: true,
		components: fromFractalsvelte(fractalsvelteManifest as FractalManifest, 'fractalsvelte-ui')
	},
	{
		id: 'fstyled',
		base: '/fstyled',
		title: 'fractalstyler edition',
		pkg: '@fractaldesign/fractalsvelte-ui/styler',
		repo: 'fractalsvelte-ui',
		intro:
			"fractalsvelte-ui's fractalstyler edition: no style blocks, no inline styles, only fractalstyler classes.",
		order: fractalGroups,
		install: 'pnpm add @fractaldesign/fractalsvelte-ui @fractaldesign/fractalstyler fractalicons',
		setup: stylerSetup,
		use: stylerUse,
		wrapPreview: true,
		components: fromFractalsvelte(stylerManifest as FractalManifest, 'fractalsvelte-ui')
	},
	{
		id: 'machines-ui',
		base: '/machines-ui',
		title: 'machines-ui',
		pkg: '@fractaldesign/machines-ui',
		repo: 'machines-ui',
		intro:
			'Character-drawn graphs, animated terminals, diagrams and a workflow canvas — live, with props and examples.',
		order: machineGroups,
		install: 'pnpm add @fractaldesign/machines-ui',
		setup: machinesSetup,
		use: machinesUse,
		wrapPreview: false,
		components: fromMachines(machinesManifest as MachineManifest, '@fractaldesign/machines-ui')
	}
];

function buildSet(config: SetConfig, order: number): DocSet {
	const ids = new Set(config.order.map((g) => g.id));
	const groups: DocGroup[] = config.order
		.map((g) => g)
		.filter((g) => config.components.some((c) => c.group === g.id))
		.concat(
			[...new Set(config.components.map((c) => c.group))]
				.filter((id) => !ids.has(id))
				.map((id) => ({ id, label: label(id) }))
		);
	return {
		id: config.id,
		base: config.base,
		title: config.title,
		package: config.pkg,
		repo: config.repo,
		intro: config.intro,
		order,
		components: config.components,
		groups,
		install: config.install,
		setup: config.setup,
		use: config.use,
		wrapPreview: config.wrapPreview,
		blobBase: `${GITHUB_BASE}${config.repo}/blob/main/`
	};
}

export const docSets: DocSet[] = SETS.map((s, i) => buildSet(s, i));

export const docSetById: Record<string, DocSet> = Object.fromEntries(docSets.map((s) => [s.id, s]));

export function getSet(id: string): DocSet | undefined {
	return docSetById[id];
}

export function groupLabel(set: DocSet, id: string): string {
	return set.groups.find((g) => g.id === id)?.label ?? label(id);
}

/** The left-rail tree: display names and links, grouped, in catalogue order. */
export function navFor(set: DocSet) {
	return set.groups
		.map((g) => ({
			id: g.id,
			label: g.label,
			links: set.components
				.filter((c) => c.group === g.id)
				.map((c) => ({ name: c.displayName, slug: c.slug }))
		}))
		.filter((g) => g.links.length);
}

export function sourceUrl(set: DocSet, component: DocComponent): string | null {
	return component.file ? `${set.blobBase}${component.file}` : null;
}

/** Resolve a component with its group label, related links, neighbours and URL. */
export function resolveComponent(set: DocSet, slug: string): ResolvedComponent | undefined {
	const index = set.components.findIndex((c) => c.slug === slug);
	if (index < 0) return undefined;
	const c = set.components[index];
	const link = (name: string): DocLink | undefined => {
		const x = set.components.find((y) => y.name === name);
		return x ? { name: x.displayName, slug: x.slug } : undefined;
	};
	const uses = c.uses.map(link).filter((x): x is DocLink => !!x);
	const usedBy = set.components
		.filter((x) => x.uses.includes(c.name))
		.map((x) => ({ name: x.displayName, slug: x.slug }));
	const neighbor = (n: number): DocLink | undefined => {
		const x = set.components[index + n];
		return x ? { name: x.displayName, slug: x.slug } : undefined;
	};
	return {
		...c,
		groupLabel: groupLabel(set, c.group),
		uses,
		usedBy,
		previous: neighbor(-1),
		next: neighbor(1),
		path: `${set.base}/${slug}`,
		sourceUrl: sourceUrl(set, c)
	};
}
