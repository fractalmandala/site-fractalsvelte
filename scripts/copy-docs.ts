// Copies each package's own documentation from its folder in the monorepo into
// the site: markdown guides become mdsvex pages under src/content/docs/<project>/,
// component API data lands in src/lib/generated/components/. Run with
// `pnpm docs:copy` (or `pnpm docs:sync` for all). Set FRACTAL_PACKAGES to point
// at a different packages folder.
import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, toMdsvex, writeFile } from './lib/content.ts';

const PACKAGES = process.env.FRACTAL_PACKAGES ?? path.resolve(ROOT, '../../packages');
const GH = 'https://github.com/fractalmandala';
const read = (rel: string) => fs.readFile(path.join(PACKAGES, rel), 'utf8');

/** Markdown guides, in reading order. Maintainer notes and archived docs stay behind. */
type Guide = { slug: string; title: string; description: string } & (
	| { file: string; recipes?: undefined }
	| { recipes: string; file?: undefined }
);
type Recipe = { name: string; intents: string[]; markup: string; notes: string };

const GUIDES: Record<string, Guide[]> = {
	fractalstyler: [
		{
			slug: 'configuration',
			file: 'fractalstyler/docs/references/configurations-api.md',
			title: 'Configuration API',
			description: 'Every Sass variable, runtime token, data-* axis and class family in the system.'
		},
		{
			slug: 'tokens',
			file: 'fractalstyler/skills/fractalstyler/references/tokens.md',
			title: 'Token reference',
			description:
				'The type, space, radius, colour and motion tokens, and the classes each one emits.'
		},
		{
			slug: 'classes',
			file: 'fractalstyler/docs/REGISTRY.api.md',
			title: 'Class registry',
			description: 'All 498 classes by layer, with the declarations they expand to.'
		},
		{
			slug: 'recipes',
			recipes: 'fractalstyler/data/recipes.json',
			title: 'Recipes',
			description: 'Verified compositions for common patterns, rendered live on this page.'
		},
		{
			slug: 'agent-skill',
			file: 'fractalstyler/skills/fractalstyler/SKILL.md',
			title: 'Agent skill',
			description: 'The rules a coding agent follows to compose with fractalstyler.'
		},
		{
			slug: 'vscode',
			file: 'fractalstyler/fractalstyler-vscode/README.md',
			title: 'VS Code extension',
			description: 'Class completions, hovers and an editor for the styles folder.'
		}
	]
};

const REPOS: Record<string, string> = { fractalstyler: `${GH}/fractalstyler/blob/main/` };

/** Generated references open with a note to maintainers; readers don't need it. */
const dropGeneratedNote = (md: string) => md.replace(/^GENERATED FILE[\s\S]*?\n\n/m, '');

function recipesMarkdown({ recipes }: { recipes: Recipe[] }) {
	const sections = recipes.map((r) => {
		// Previews render the markup live: a closed <dialog> is opened in place,
		// and absolutely positioned menus get room below them.
		const preview = r.markup.replace('<dialog class="', '<dialog open class="relative ');
		const room = /\babsolute\b/.test(r.markup) ? ' pb-3xl' : '';
		return [
			`## ${r.name}`,
			'',
			`For: ${r.intents.join(' · ')}`,
			'',
			`<div class="border radius-sm pad-lg bg-surface relative${room}">`,
			preview,
			'</div>',
			'',
			'```svelte',
			r.markup,
			'```',
			'',
			r.notes
		].join('\n');
	});
	return [
		"Each recipe is a composition verified against the registry. The preview above each one is the markup below it, rendered by this site's own copy of fractalstyler.",
		'',
		...sections
	].join('\n\n');
}

const index: Record<string, { slug: string; title: string; description: string }[]> = {};
await fs.rm(path.join(ROOT, 'src/content/docs'), { recursive: true, force: true });

for (const [project, guides] of Object.entries(GUIDES)) {
	index[project] = [];
	for (const guide of guides) {
		const source = guide.file ?? guide.recipes;
		const markdown = guide.recipes
			? recipesMarkdown(JSON.parse(await read(guide.recipes)))
			: dropGeneratedNote(await read(guide.file!));
		await writeFile(
			`src/content/docs/${project}/${guide.slug}.md`,
			toMdsvex(markdown, {
				title: guide.title,
				description: guide.description,
				source: `packages/${source}`,
				blobBase: REPOS[project],
				html: Boolean(guide.recipes)
			})
		);
		index[project].push({ slug: guide.slug, title: guide.title, description: guide.description });
		console.log(`docs/${project}/${guide.slug}.md  ←  ${source}`);
	}
}
await writeFile('src/lib/generated/docs.json', JSON.stringify(index, null, '\t') + '\n');

// Component API references, as each library's own docs pipeline emits them.
const COMPONENTS = {
	'fractalsvelte-ui': 'fractalsvelte-ui/src/lib/documentation/manifest.json',
	'machines-ui': 'machines-ui/src/docs/data/components.json'
};
for (const [project, file] of Object.entries(COMPONENTS)) {
	await writeFile(`src/lib/generated/components/${project}.json`, await read(file));
	console.log(`components/${project}.json  ←  ${file}`);
}

// fractalsvelte-ui's shared unions (Variant, Size, Shape…) are `as const` arrays in
// types.ts; expand them so props tables can list the accepted values.
const typesFile = 'fractalsvelte-ui/src/lib/types.ts';
const typesSource = await read(typesFile);
const arrays: Record<string, string> = Object.fromEntries(
	[...typesSource.matchAll(/export const (\w+) = \[([\s\S]*?)\] as const;/g)].map(
		([, name, body]) => [name, [...body.matchAll(/'([^']*)'/g)].map((m) => `'${m[1]}'`).join(' | ')]
	)
);
const unions = Object.fromEntries(
	[...typesSource.matchAll(/export type (\w+) = \(typeof (\w+)\)\[number\];/g)]
		.filter(([, , array]) => arrays[array])
		.map(([, type, array]) => [type, arrays[array]])
);
await writeFile(
	'src/lib/generated/components/fractalsvelte-ui.types.json',
	JSON.stringify(unions, null, '\t') + '\n'
);
console.log(
	`components/fractalsvelte-ui.types.json  ←  ${typesFile} (${Object.keys(unions).length} unions)`
);
