import guideIndex from './generated/docs.json';
import registry from './generated/registry.json';

export const GITHUB = 'https://github.com/fractalmandala';

export type Snippet = { title: string; lang: string; code: string };
export type Stat = { value: string; label: string };
export type Feature = { title: string; body: string };

export type Package = {
	/** npm name, e.g. `@fractaldesign/pop-svelte` */
	name: string;
	/** Route segment under the project; undefined for the project's main package */
	slug?: string;
	/** Readme file in src/content, without extension */
	readme: string;
	/** Path inside the repo, for resolving relative README links */
	repoPath: string;
	/** Install as a dev dependency */
	dev?: boolean;
	/** Companions installed alongside: [runtime deps, dev deps] */
	with?: { deps?: string[]; dev?: string[] };
	role: string;
	/** Search snippet for this package's page, when it isn't the project page */
	seo?: { title: string; description: string };
	version: string;
	description: string;
	license: string;
	published: string;
};

export type Project = {
	slug: string;
	/** Wordmark split into the muted and the theme-coloured half */
	mark: [string, string];
	kind: string;
	summary: string;
	/** Search title (≤60) and description (≤160), written for the queries people type */
	seo: { title: string; description: string };
	repo: string;
	packages: Package[];
	/** Has a generated component API reference under /<slug>/components */
	components?: boolean;
	/** Extra outbound links shown on the project page, e.g. a live examples site */
	links?: { label: string; href: string }[];
	stats: Stat[];
	features: Feature[];
	quickstart: Snippet[];
};

type PackageInput = Omit<Package, 'version' | 'description' | 'license' | 'published'>;

function pkg(input: PackageInput): Package {
	const meta = (registry as Record<string, Omit<Package, keyof PackageInput>>)[input.name];
	if (!meta) throw new Error(`${input.name} is missing from registry.json — run pnpm docs:sync`);
	return { ...input, ...meta };
}

export const projects: Project[] = [
	{
		slug: 'fractalstyler',
		mark: ['fractal', 'styler'],
		kind: 'Styling system',
		summary:
			'A composition styling system, shipped as plain CSS and as editable Sass. The class registry is the public API: compose in markup, write no stylesheet.',
		seo: {
			title: 'fractalstyler \u2014 CSS styling system for Svelte & SvelteKit',
			description:
				'A class-based CSS styling system for Svelte and SvelteKit: 498 utility classes, design tokens and runtime presets, as plain CSS or editable Sass.'
		},
		repo: `${GITHUB}/fractalstyler`,
		packages: [
			pkg({
				name: '@fractaldesign/fractalstyler',
				readme: 'fractalstyler',
				repoPath: '',
				dev: true,
				with: { dev: ['sass'] },
				role: 'Classes, tokens, CLI, linter and MCP server'
			})
		],
		stats: [
			{ value: '498', label: 'Classes' },
			{ value: '6', label: 'Layers' },
			{ value: '4', label: 'Preset axes' },
			{ value: '0', label: 'Runtime deps' }
		],
		features: [
			{
				title: 'The registry is the API',
				body: 'Every class is listed, described and greppable. If a token exists, so does its class: --space-md becomes .gap-md, .pad-md and .mar-md.'
			},
			{
				title: 'x is always horizontal',
				body: 'Alignment modifiers sit on .box, .row and .grid and keep their meaning when you flip a container from column to row.'
			},
			{
				title: 'Grids that step through divisors',
				body: '.grid-6 goes to three, then two, then one. Never five, never a row left holding a single card.'
			},
			{
				title: 'Plain CSS or editable Sass',
				body: 'Import the compiled stylesheet with no toolchain, @use the Sass layers, or eject them into your project and own every line.'
			},
			{
				title: 'Presets as data attributes',
				body: 'Size, shape, variant and padding are data-* axes. Sweep them across a page at runtime with one function call.'
			},
			{
				title: 'A contract your agent is held to',
				body: 'A linter that rejects invented class names, an MCP server over the registry, and an agent skill on disk.'
			}
		],
		quickstart: [
			{
				title: 'src/app.sass',
				lang: 'sass',
				code: "@use '@fractaldesign/fractalstyler/styles' as *"
			},
			{
				title: 'or, without Sass',
				lang: 'js',
				code: "import '@fractaldesign/fractalstyler/css';"
			},
			{
				title: 'Compose in markup',
				lang: 'svelte',
				code: `<div class="row ycenter xbetween gap-sm pad-md bg-surface border radius-md">
	<span class="text-md weight-600">Fractalstyler</span>
	<button data-variant="primary" data-shape="modern">Continue</button>
</div>`
			}
		]
	},
	{
		slug: 'fractalsvelte-ui',
		mark: ['fractalsvelte', '-ui'],
		kind: 'Component library',
		summary:
			'A token-driven Svelte 5 runes component library. Pick a variant, shape and size with props, and restyle anything with your own CSS — the library ships in a cascade layer, so your styles always win.',
		seo: {
			title: 'fractalsvelte-ui \u2014 Svelte 5 component library for SvelteKit',
			description:
				'124 Svelte 5 components for SvelteKit: buttons, forms, dialogs, data tables and motion. Typed variant, size and shape props, and your CSS always wins.'
		},
		repo: `${GITHUB}/fractalsvelte-ui`,
		components: true,
		packages: [
			pkg({
				name: '@fractaldesign/fractalsvelte-ui',
				readme: 'fractalsvelte-ui',
				repoPath: '',
				role: 'Components, tokens and transitions'
			})
		],
		stats: [
			{ value: '124', label: 'Components' },
			{ value: '7', label: 'Variants' },
			{ value: '5', label: 'Sizes' },
			{ value: '3', label: 'Shapes' }
		],
		features: [
			{
				title: 'Props for the visual axes',
				body: 'variant, size and shape are typed props on every control, with the unions exported from /types for your own wrappers.'
			},
			{
				title: 'Your CSS always wins',
				body: 'All library styles live in the fractalsvelte-ui cascade layer. Any unlayered rule you write beats them, whatever its specificity.'
			},
			{
				title: 'Import only what you use',
				body: 'Tree-shaken from the package root, or deep-imported one file at a time from /components/*.'
			},
			{
				title: 'Pure Svelte 5 runes',
				body: '$props, $state, $derived, $bindable and snippets throughout. No legacy syntax, no stores to wire.'
			},
			{
				title: 'One token set',
				body: 'Light and dark themes and five aesthetic presets from a single set of --f-* custom properties.'
			},
			{
				title: 'Motion and blocks included',
				body: 'Spotlight cards, marquees, text scramble and confetti next to pricing cards, timelines and a workflow canvas.'
			}
		],
		quickstart: [
			{
				title: 'src/routes/+layout.svelte',
				lang: 'svelte',
				code: `<script>
	import '@fractaldesign/fractalsvelte-ui/tokens.css';
	let { children } = $props();
</script>

{@render children()}`
			},
			{
				title: 'Any component',
				lang: 'svelte',
				code: `<script lang="ts">
	import { Button, Badge } from '@fractaldesign/fractalsvelte-ui';
</script>

<Button variant="outline" size="lg" shape="pill">Execute pipeline</Button>
<Badge variant="success">New</Badge>`
			},
			{
				title: 'Restyle with your own class',
				lang: 'svelte',
				code: `<Button class="cta">Buy</Button>

<style>
	:global(.cta) {
		background: hotpink;
		border-radius: 0;
	}
</style>`
			}
		]
	},
	{
		slug: 'machines-ui',
		mark: ['machines', '-ui'],
		kind: 'Character-drawn components',
		summary:
			'Svelte 5 components drawn with characters: graphs, animated terminals, diagrams, and a node-and-edge workflow builder. Dashed frames, block glyphs, monospace type.',
		seo: {
			title: 'machines-ui \u2014 ASCII graphs, terminals & diagrams for Svelte',
			description:
				'Svelte 5 components drawn with characters: ASCII charts and graphs, animated terminals, diagrams and a node-based workflow builder. No SVG, no canvas.'
		},
		repo: `${GITHUB}/machines-ui`,
		links: [{ label: 'Live examples', href: 'https://machines.fractalsvelte.dev' }],
		components: true,
		packages: [
			pkg({
				name: '@fractaldesign/machines-ui',
				readme: 'machines-ui',
				repoPath: '',
				role: 'Graphs, animations, diagrams and the flow builder'
			})
		],
		stats: [
			{ value: '5', label: 'Families' },
			{ value: '18', label: 'Accent colours' },
			{ value: '10', label: 'Seed workflows' },
			{ value: '0', label: 'SVG or canvas' }
		],
		features: [
			{
				title: 'Graphs made of glyphs',
				body: 'Stats, charts, tables and timelines rendered as characters inside a dashed frame, so they sit naturally in docs and terminals.'
			},
			{
				title: 'Animated readouts',
				body: 'Terminals, rain, fire, life and live readouts. Every animation stops when the user prefers reduced motion.'
			},
			{
				title: 'A workflow builder',
				body: 'FlowCanvas is a node canvas with an actions panel and a step inspector. State lives in the exported flow store, with ten sample workflows to load.'
			},
			{
				title: 'Nodes on their own',
				body: 'FlowNode renders a single node outside the canvas, drawn as a dashed frame or as a card.'
			},
			{
				title: 'Never paints your page',
				body: 'Graphs read a few tokens with a dark fallback scoped to .graph. Opt into your own tokens with one attribute.'
			},
			{
				title: 'One accent, everywhere',
				body: 'Choose from a palette of 18 colours and every graph on the page follows.'
			}
		],
		quickstart: [
			{
				title: 'Graphs',
				lang: 'svelte',
				code: `<script lang="ts">
	import '@fractaldesign/machines-ui/style.css';
	import { GraphKpi, GraphMeter } from '@fractaldesign/machines-ui';
</script>

<GraphKpi title="READS" value="12,400" label="this week" hint="+18%" data={[4, 5, 6, 8, 9, 12]} />
<GraphMeter title="QUOTA" value={0.64} caption="storage used" />`
			},
			{
				title: 'Workflow builder',
				lang: 'svelte',
				code: `<script lang="ts">
	import '@fractaldesign/machines-ui/style.css';
	import { FlowCanvas, loadGraph, SEED_GRAPHS } from '@fractaldesign/machines-ui';

	loadGraph('jev', SEED_GRAPHS.jev);
</script>

<!-- FlowCanvas fills its container: give it an explicit height -->
<div style="height: 40rem">
	<FlowCanvas />
</div>`
			}
		]
	},
	{
		slug: 'fractalpop',
		mark: ['fractal', 'pop'],
		kind: 'Syntax highlighting',
		summary:
			'Lightweight, Svelte-first syntax highlighting with first-class indented Sass. Returns an HTML string without a DOM, with adapters for Svelte, mdsvex and remark.',
		seo: {
			title: 'fractalpop \u2014 fast syntax highlighting for Svelte & SvelteKit',
			description:
				'Lightweight syntax highlighter for Svelte, SvelteKit, mdsvex and remark. 32 languages, first-class indented Sass, about 5 KB gzipped, no DOM needed.'
		},
		repo: `${GITHUB}/fractalpop`,
		packages: [
			pkg({
				name: '@fractaldesign/pop',
				readme: 'pop',
				repoPath: 'packages/core',
				role: 'The engine: code in, HTML string out'
			}),
			pkg({
				name: '@fractaldesign/pop-svelte',
				slug: 'svelte',
				readme: 'pop-svelte',
				repoPath: 'packages/svelte',
				seo: {
					title: 'pop-svelte \u2014 Svelte & SvelteKit code highlighting components',
					description:
						'Svelte 5 components for syntax highlighting in SvelteKit: Highlight, Code with line numbers, a live Editor and a FileTree. Server-rendered, no flash.'
				},
				with: { deps: ['@fractaldesign/pop'] },
				role: 'Highlight, Code, Editor and FileTree components'
			}),
			pkg({
				name: '@fractaldesign/pop-mdsvex',
				slug: 'mdsvex',
				readme: 'pop-mdsvex',
				repoPath: 'packages/mdsvex',
				seo: {
					title: 'pop-mdsvex \u2014 mdsvex code highlighting for SvelteKit',
					description:
						'Highlight fenced code in mdsvex .svx and .md files with fractalpop. One line in svelte.config.js, line highlighting with {2,4-6}, Svelte-safe output.'
				},
				dev: true,
				with: { dev: ['mdsvex'], deps: ['@fractaldesign/pop'] },
				role: 'Highlighter hook for .svx and .md files'
			}),
			pkg({
				name: '@fractaldesign/pop-remark',
				slug: 'remark',
				readme: 'pop-remark',
				repoPath: 'packages/remark',
				seo: {
					title: 'pop-remark \u2014 remark plugin for Markdown & MDX highlighting',
					description:
						'A remark plugin that highlights fenced code in Markdown and MDX with fractalpop. Works in Astro, Next MDX, Docusaurus and any unified pipeline.'
				},
				with: { deps: ['@fractaldesign/pop'] },
				role: 'remark plugin for Markdown and MDX'
			})
		],
		stats: [
			{ value: '32', label: 'Languages' },
			{ value: '5.3 KiB', label: 'Gzipped' },
			{ value: '0', label: 'Runtime deps' },
			{ value: '9', label: 'Token types' }
		],
		features: [
			{
				title: 'No DOM required',
				body: 'highlight() returns an HTML string, so it runs on the server, at build time, in a worker or on the edge.'
			},
			{
				title: 'Indented Sass, properly',
				body: 'First-class sass with no braces or semicolons, and a composite svelte grammar for script, markup and style.'
			},
			{
				title: 'Bring your own colours',
				body: 'Nine stable token types, each a CSS variable. A theme is one block of --fp-* custom properties.'
			},
			{
				title: 'Tree-shakeable languages',
				body: 'The default entry registers TypeScript and plaintext. Register more, or import /full for all 32.'
			},
			{
				title: 'A fast path by default',
				body: 'With no customization hooks, rendering concatenates strings with no per-token allocation.'
			},
			{
				title: 'Every pipeline covered',
				body: 'Svelte components and an action, an mdsvex highlighter, and a remark plugin for Markdown and MDX.'
			}
		],
		quickstart: [
			{
				title: 'Anywhere',
				lang: 'ts',
				code: `import { highlight } from '@fractaldesign/pop';

const html = highlight('const ready = true', { lang: 'ts' });`
			},
			{
				title: 'In Svelte',
				lang: 'svelte',
				code: `<script lang="ts">
	import { Code } from '@fractaldesign/pop-svelte';
</script>

<Code code={source} lang="ts" title="example.ts" lineNumbers />`
			},
			{
				title: 'svelte.config.js',
				lang: 'js',
				code: `import { mdsvex } from 'mdsvex';
import { fractalpopHighlighter } from '@fractaldesign/pop-mdsvex';

export default {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [mdsvex({ extensions: ['.svx', '.md'], highlight: { highlighter: fractalpopHighlighter } })]
};`
			}
		]
	}
];

export type Guide = { slug: string; title: string; description: string };

/** Guides copied from each package's folder by scripts/copy-docs.mjs */
export const guides = guideIndex as Record<string, Guide[] | undefined>;

export const packageCount = projects.reduce((n, p) => n + p.packages.length, 0);

export function findProject(slug: string) {
	return projects.find((p) => p.slug === slug);
}

/** The package a docs route shows: the project's main package, or a named sub-package. */
export function findPackage(project: Project, slug?: string) {
	return slug ? project.packages.find((p) => p.slug === slug) : project.packages[0];
}

export function packageHref(project: Project, p: Package) {
	return p.slug ? `/${project.slug}/${p.slug}` : `/${project.slug}`;
}

export const managers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export type Manager = (typeof managers)[number];

/** The install lines for a package: its own line plus a line per dependency kind. */
export function installLines(p: Package) {
	const deps = [...(p.dev ? [] : [p.name]), ...(p.with?.deps ?? [])];
	const dev = [...(p.dev ? [p.name] : []), ...(p.with?.dev ?? [])];
	return [
		...(dev.length ? [{ names: dev, dev: true }] : []),
		...(deps.length ? [{ names: deps, dev: false }] : [])
	];
}

export function installCommand(manager: Manager, names: string[], dev = false) {
	const list = names.join(' ');
	switch (manager) {
		case 'npm':
			return `npm install${dev ? ' -D' : ''} ${list}`;
		case 'yarn':
			return `yarn add${dev ? ' -D' : ''} ${list}`;
		case 'bun':
			return `bun add${dev ? ' -d' : ''} ${list}`;
		default:
			return `pnpm add${dev ? ' -D' : ''} ${list}`;
	}
}
