import fractalsvelteUi from '#lib/generated/components/fractalsvelte-ui.json';
import sharedUnions from '#lib/generated/components/fractalsvelte-ui.types.json';
import machinesUi from '#lib/generated/components/machines-ui.json';
import { GITHUB } from '#lib/site.js';

export type ApiProp = {
	name: string;
	type: string;
	default: string | null;
	description: string | null;
	bindable: boolean;
	optional: boolean;
	/** The accepted values, when the type is a named string union */
	values: string | null;
};

export type ComponentDoc = {
	slug: string;
	name: string;
	group: string;
	/** What people search for: "split button", "animated ASCII fire" */
	phrase: string;
	description: string;
	/** What to paste to use it, or null when the component isn't exported */
	imports: string | null;
	examples: string[];
	props: ApiProp[];
	/** Snippet props (fractalsvelte-ui) or slots (machines-ui) */
	snippets: ApiProp[];
	extends: string | null;
	source: string | null;
	sourceUrl: string;
};

export type ComponentLibrary = {
	/** Where the reference was generated, shown to readers */
	origin: string;
	groups: { id: string; label: string }[];
	components: ComponentDoc[];
};

/** PascalCase to search words: IconButton → icon button, Card3D → card 3d */
const words = (name: string) => name.replace(/([a-z])([A-Z0-9])/g, '$1 $2').toLowerCase();

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const label = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

type ManifestProp = {
	name: string;
	type: string;
	optional: boolean;
	default: string | null;
	bindable: boolean;
	description: string | null;
};

function fromManifest(): ComponentLibrary {
	const order = [
		'actions',
		'forms',
		'display',
		'layout',
		'navigation',
		'overlays',
		'typography',
		'motion',
		'blocks',
		'doc'
	];
	const shared = sharedUnions as Record<string, string>;
	const components = fractalsvelteUi.components.map((c) => {
		// a component's own aliases (CardVariant…) take precedence over the shared ones
		const unions: Record<string, string> = { ...shared };
		for (const t of c.types as { name: string; definition: string }[])
			if (/^'[^']*'(\s*\|\s*'[^']*')*$/.test(t.definition.trim())) unions[t.name] = t.definition;
		const values = (type: string) => {
			const names = type.match(/\b[A-Z]\w*\b/g)?.filter((n) => unions[n]) ?? [];
			return names.length ? names.map((n) => unions[n]).join(' | ') : null;
		};
		const prop = (p: ManifestProp): ApiProp => ({
			name: p.name,
			type: p.type,
			default: p.default,
			description: p.description,
			bindable: p.bindable,
			optional: p.optional,
			values: values(p.type)
		});
		return {
			slug: kebab(c.name),
			name: c.name,
			group: c.category,
			phrase: words(c.name),
			description: c.description,
			imports: c.importSnippet,
			examples: c.usageSnippet ? [c.usageSnippet] : [],
			props: (c.props as ManifestProp[]).map(prop),
			snippets: (c.snippets as ManifestProp[]).map(prop),
			extends: c.extends?.base
				? `${c.extends.base}${c.extends.omit?.length ? ` (without ${c.extends.omit.join(', ')})` : ''}`
				: null,
			source: c.code,
			sourceUrl: `${GITHUB}/fractalsvelte-ui/blob/main/${c.file}`
		};
	});
	return {
		origin: 'Generated from the component sources by the library’s AST documentation extractor.',
		groups: order
			.filter((id) => components.some((c) => c.group === id))
			.map((id) => ({ id, label: id === 'doc' ? 'Documentation helpers' : label(id) })),
		components
	};
}

type MachineProp = {
	name: string;
	type?: string;
	optional?: boolean;
	default?: string;
	description?: string;
};

function machinePhrase(family: string, displayName: string) {
	const w = words(displayName);
	if (family === 'graphs') return `ASCII ${w} chart`;
	if (family === 'animated') return `animated ASCII ${w}`;
	if (family === 'flow') return `workflow ${w.replace(/^flow /, '')}`;
	if (family === 'diagram') return w.includes('diagram') ? `ASCII ${w}` : `ASCII ${w} diagram`;
	return `ASCII ${w}`;
}

function fromMachines(): ComponentLibrary {
	const order = ['frame', 'graphs', 'animated', 'diagram', 'flow'];
	const prop = (p: MachineProp): ApiProp => ({
		name: p.name,
		type: p.type ?? 'unknown',
		default: p.default ?? null,
		description: p.description ?? null,
		bindable: false,
		optional: p.optional ?? true,
		values: null
	});
	const components = machinesUi.components.map((c) => ({
		slug: c.slug,
		name: c.name,
		group: c.family,
		phrase: machinePhrase(c.family, c.displayName),
		description: c.description,
		imports: c.exported
			? `import '@fractaldesign/machines-ui/style.css';\nimport { ${c.name} } from '@fractaldesign/machines-ui';`
			: null,
		examples: c.examples ?? [],
		props: (c.props as MachineProp[]).map(prop),
		snippets: ((c.slots ?? []) as MachineProp[]).map(prop),
		extends: null,
		source: null,
		sourceUrl: `${GITHUB}/machines-ui/blob/main/${c.file}`
	}));
	return {
		origin:
			'Generated from the component sources by the library’s sveld pipeline. It tracks the repository, so it can include components newer than the published version.',
		groups: order
			.filter((id) => components.some((c) => c.group === id))
			.map((id) => ({ id, label: label(id) })),
		components
	};
}

export const libraries: Record<string, ComponentLibrary> = {
	'fractalsvelte-ui': fromManifest(),
	'machines-ui': fromMachines()
};
