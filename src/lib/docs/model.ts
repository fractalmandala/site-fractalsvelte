// The normalized component-docs model. Every component library's own generated
// manifest is adapted into this shape, so one set of routes and one set of
// components can document any library. Nothing here is derived from source: the
// manifests are copied verbatim from each package by scripts/copy-docs.ts.

/** PascalCase to display words: IconButton → Icon Button, Card3D → Card 3D */
export const humanize = (name: string) => name.replace(/([a-z])([A-Z0-9])/g, '$1 $2');

/** PascalCase to a URL slug: IconButton → icon-button, Card3D → card-3-d */
export const kebab = (name: string) => name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

export const label = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

export type DocLink = { name: string; slug: string };

/** A prop, a snippet prop or a callback — all render the same, only the flag differs. */
export type DocProp = {
	name: string;
	type: string;
	default: string | null;
	optional: boolean;
	description: string | null;
	/** The accepted values, when the type is a closed string union */
	values: string[] | null;
	bindable: boolean;
	kind: 'prop' | 'snippet' | 'callback';
	/** machines-ui: the looks that take this prop, when only some do */
	only: string[] | null;
	/** machines-ui: other component props this one relates to */
	refs: string[] | null;
	/** machines-ui: the prop this one is an alias of */
	alias: string | null;
};

export type DocType = {
	name: string;
	kind: string;
	definition: string | null;
	doc: string | null;
};

export type DocMotion = { animatedProp: boolean; reveal: boolean; reducedMotion: boolean };

export type DocComponent = {
	slug: string;
	/** The export name, as imported: ButtonGroup */
	name: string;
	/** The spaced label readers see: Button Group */
	displayName: string;
	/** The category/family id */
	group: string;
	description: string;
	/** The canonical import statement */
	importSnippet: string | null;
	/** Authored usage examples from the manifest */
	examples: string[];
	props: DocProp[];
	snippets: DocProp[];
	types: DocType[];
	extends: { base: string; omit: string[] } | null;
	tokens: string[];
	classes: string[];
	renames: Record<string, string>;
	motion: DocMotion | null;
	hasChildren: boolean;
	hasPreview: boolean;
	/** Other components this one builds from / is used by, as raw export names */
	uses: string[];
	/** Verbatim source, when the manifest captured it */
	source: { code: string; file: string } | null;
	/** Repo-relative source path, even when no source text was captured */
	file: string | null;
	/** Named slots the component exposes */
	slots: { name: string; props: string | null }[];
};

export type DocGroup = { id: string; label: string };

/** A doc set is one library's live documentation: a manifest, a route base and its chrome. */
export type DocSet = {
	/** The route base segment: fractalsvelte-ui, fstyled, machines-ui */
	id: string;
	base: string;
	/** The name shown in the shell: fractalsvelte-ui */
	title: string;
	/** The npm package the live demos import */
	package: string;
	/** The GitHub repo the source links point at */
	repo: string;
	/** Lede for the index page */
	intro: string;
	/** Relative weight in llms.txt and the site's project list */
	order: number;
	components: DocComponent[];
	groups: DocGroup[];
	install: string;
	setup: string;
	use: string;
	/** source file blob base, e.g. .../fractalsvelte-ui/blob/main/ */
	blobBase: string;
	/** Wrap the demo in the site's preview stage (false when the demo stages itself) */
	wrapPreview: boolean;
};

export type ResolvedComponent = Omit<DocComponent, 'uses'> & {
	groupLabel: string;
	uses: DocLink[];
	usedBy: DocLink[];
	previous?: DocLink;
	next?: DocLink;
	path: string;
	sourceUrl: string | null;
};
