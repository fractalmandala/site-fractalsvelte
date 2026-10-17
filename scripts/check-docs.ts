// Audits the site's component docs against each package's generated manifest.
//
// The point is the field coverage check: every key a manifest carries must be
// either rendered somewhere in src/lib/docs/DocPage.svelte (or the adapter that
// feeds it), or listed below in NOT_RENDERED with a reason. When a package's
// extractor learns a new field, this fails until the site shows it — so the docs
// here can never quietly become less complete than the library's own.
//
// Run with `pnpm check:docs`. Fails on: an unhandled field, a stale copied
// manifest, a component with no demo, or a component missing its description.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PACKAGES = process.env.FRACTAL_PACKAGES ?? path.resolve(ROOT, '../../packages');

type Manifest = {
	set: string;
	kind: 'fractal' | 'machine';
	src: string;
	copy: string;
};

const MANIFESTS: Manifest[] = [
	{
		set: 'fractalsvelte-ui',
		kind: 'fractal',
		src: 'fractalsvelte-ui/src/lib/documentation/manifest.json',
		copy: 'src/lib/generated/components/fractalsvelte-ui.json'
	},
	{
		set: 'fstyled',
		kind: 'fractal',
		src: 'fractalsvelte-ui/src/lib/documentation/manifest.styler.json',
		copy: 'src/lib/generated/components/fractalsvelte-ui-styler.json'
	},
	{
		set: 'machines-ui',
		kind: 'machine',
		src: 'machines-ui/src/docs/data/components.json',
		copy: 'src/lib/generated/components/machines-ui.json'
	}
];

// Where each manifest field is rendered. A field absent here and absent from
// NOT_RENDERED fails the check.
const RENDERED: Record<
	Manifest['kind'],
	{ component: Record<string, string>; prop: Record<string, string> }
> = {
	fractal: {
		component: {
			name: 'Preview, Usage, Source heading',
			category: 'group nav + Variants heading',
			file: 'Source link (+ file in the source summary)',
			description: 'page lede',
			importSnippet: 'Import section',
			usageSnippet: 'Library examples section',
			extends: 'Props section note',
			props: 'Props section',
			snippets: 'Snippets & callbacks section',
			types: 'Exported types section',
			code: 'Source section'
		},
		prop: {
			name: 'PropsTable name',
			type: 'PropsTable type',
			optional: 'PropsTable required chip',
			default: 'PropsTable default',
			bindable: 'PropsTable bindable chip',
			description: 'PropsTable description'
		}
	},
	machine: {
		component: {
			name: 'Preview, Usage',
			displayName: 'all headings and links',
			slug: 'route + links',
			family: 'group nav',
			file: 'Source link',
			exported: 'adapter filter',
			description: 'page lede',
			examples: 'Library examples section',
			props: 'Props section',
			slots: 'Slots section',
			moduleTypes: 'Exported types section',
			uses: 'Related section',
			classes: 'CSS classes section',
			tokens: 'Theming tokens section',
			motion: 'Behaviour section',
			hasChildren: 'Behaviour section',
			renames: 'Renamed props section',
			hasPreview: 'Preview section'
		},
		prop: {
			name: 'PropsTable name',
			type: 'PropsTable type',
			optional: 'PropsTable required chip',
			description: 'PropsTable description',
			default: 'PropsTable default',
			refs: 'PropsTable see-also',
			values: 'PropsTable values + Variants',
			callback: 'Snippets section (callback kind)',
			snippet: 'Snippets section',
			only: 'PropsTable look-restriction',
			alias: 'PropsTable alias chip'
		}
	}
};

// Fields that are deliberately not rendered, with the reason. Keep this empty unless
// there is a written reason — that is the whole contract.
const NOT_RENDERED: Record<
	Manifest['kind'],
	Record<'component' | 'prop', Record<string, string>>
> = {
	fractal: { component: {}, prop: {} },
	machine: { component: {}, prop: {} }
};

const errors: string[] = [];
const warnings: string[] = [];
const rel = (p: string) => path.relative(ROOT, p);

function readJson(file: string) {
	return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function checkFields(
	set: string,
	kind: Manifest['kind'],
	components: Record<string, unknown>[],
	label: string,
	scope: 'component' | 'prop'
) {
	const seen = new Set<string>();
	for (const c of components) for (const key of Object.keys(c)) seen.add(key);
	for (const key of seen) {
		if (RENDERED[kind][scope][key] || NOT_RENDERED[kind][scope][key]) continue;
		errors.push(
			`${set}: ${label} field “${key}” is neither rendered nor waived — add it to DocPage or list it in NOT_RENDERED`
		);
	}
}

for (const m of MANIFESTS) {
	const copyPath = path.join(ROOT, m.copy);
	if (!fs.existsSync(copyPath)) {
		errors.push(`${m.set}: missing copied manifest ${m.copy} — run pnpm docs:copy`);
		continue;
	}
	const copy = readJson(copyPath);
	const all: Record<string, unknown>[] = copy.components ?? copy;
	// machines-ui's registry documents only exported components
	const components = m.kind === 'machine' ? all.filter((c) => c.exported) : all;

	// 1. Field coverage — the contract.
	checkFields(m.set, m.kind, components, 'component', 'component');
	checkFields(
		m.set,
		m.kind,
		components.flatMap((c) => (c.props as Record<string, unknown>[]) ?? []),
		'prop',
		'prop'
	);

	// 2. Copied manifest is identical to the package's.
	const srcPath = path.join(PACKAGES, m.src);
	if (fs.existsSync(srcPath)) {
		const same = fs.readFileSync(srcPath, 'utf8') === fs.readFileSync(copyPath, 'utf8');
		if (!same) errors.push(`${m.set}: ${m.copy} is stale — run pnpm docs:copy`);
	} else {
		warnings.push(`${m.set}: package manifest ${m.src} not found; skipping freshness check`);
	}

	// 3. Every component has a description and a demo.
	const demoDir = path.join(ROOT, 'src/lib', m.set, 'demos');
	const demos = fs.existsSync(demoDir)
		? new Set(fs.readdirSync(demoDir).map((f) => f.replace(/\.svelte$/, '')))
		: new Set<string>();
	const slugOf = (c: Record<string, unknown>) =>
		(c.slug as string) ?? (c.name as string).replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
	for (const c of components) {
		const slug = slugOf(c);
		if (!c.description) errors.push(`${m.set}/${slug}: no description in the manifest`);
		if (!demos.has(slug))
			errors.push(`${m.set}/${slug}: no demo at src/lib/${m.set}/demos/${slug}.svelte`);
	}

	// 4. Coverage report.
	const props = components.flatMap((c) => (c.props as Record<string, unknown>[]) ?? []);
	const documented = props.filter((p) => p.description).length;
	const named = new Set(components.map(slugOf));
	const orphans = [...demos].filter((d) => !named.has(d));
	if (orphans.length)
		warnings.push(
			`${m.set}: ${orphans.length} demo(s) with no component: ${orphans.slice(0, 5).join(', ')}`
		);
	warnings.push(
		`${m.set}: ${components.length} components, ${props.length} props (${Math.round((documented / props.length) * 100)}% described), ${demos.size} demos`
	);
}

for (const w of warnings) console.warn(`warn  ${w}`);
if (errors.length) {
	for (const e of errors) console.error(`error ${e}`);
	console.error(`\ncheck-docs: ${errors.length} error(s)`);
	process.exit(1);
}
console.log('\ncheck-docs: ok');
