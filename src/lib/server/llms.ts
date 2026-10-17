// llms.txt (an index, per llmstxt.org) and llms-full.txt (every doc as plain
// markdown), so AI assistants and AI search can read and cite the docs.
import { absolute } from '#lib/seo.js';
import { guides, projects } from '#lib/site.js';
import { docSets } from './docs/registry.js';
import { sitePages } from './pages';

const raw = import.meta.glob<string>('/src/content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

/** The copied markdown, back to plain text: no frontmatter, no Svelte-safe escapes. */
function plain(file: string) {
	return (raw[file] ?? '')
		.replace(/^---\n[\s\S]*?\n---\n/, '')
		.replace(/&#123;/g, '{')
		.replace(/&#125;/g, '}')
		.replace(/&lt;/g, '<')
		.trim();
}

export function llmsIndex() {
	const sections = new Map<string, string[]>();
	for (const page of sitePages.slice(1)) {
		const list = sections.get(page.section) ?? [];
		list.push(`- [${page.name}](${absolute(page.path)}): ${page.description}`);
		sections.set(page.section, list);
	}
	return [
		'# fractalsvelte',
		'',
		'> Open-source packages for Svelte 5 and SvelteKit: fractalsvelte-ui (a 124-component library), machines-ui (character-drawn graphs, terminals and diagrams), fractalstyler (a class-based CSS styling system) and fractalpop (syntax highlighting for Svelte, mdsvex and remark). All MIT, published under @fractaldesign on npm.',
		'',
		...[...sections].flatMap(([section, lines]) => [`## ${section}`, '', ...lines, '']),
		'## Optional',
		'',
		`- [Full documentation](${absolute('/llms-full.txt')}): every README, guide and component reference in one file`,
		''
	].join('\n');
}

export function llmsFull() {
	const out = ['# fractalsvelte — full documentation', ''];
	for (const project of projects) {
		out.push(`# ${project.slug}`, '', project.summary, '');
		for (const pkg of project.packages) {
			out.push(`## ${pkg.name} README`, '', plain(`/src/content/readme/${pkg.readme}.md`), '');
		}
		for (const guide of guides[project.slug] ?? []) {
			out.push(
				`## ${guide.title}`,
				'',
				plain(`/src/content/docs/${project.slug}/${guide.slug}.md`),
				''
			);
		}
	}
	for (const set of docSets) {
		out.push(`## ${set.title} component reference`, '');
		for (const c of set.components) {
			out.push(`### ${c.displayName}`, '', c.description, '');
			if (c.importSnippet) out.push('```ts', c.importSnippet, '```', '');
			for (const example of c.examples) out.push('```svelte', example, '```', '');
			if (c.props.length) {
				out.push('Props:', '');
				for (const p of c.props) {
					const values = p.values?.length ? ` (${p.values.join(' | ')})` : '';
					const fallback = p.default ? `, default ${p.default}` : '';
					const about = p.description ? ` — ${p.description}` : '';
					out.push(`- \`${p.name}\`: \`${p.type}\`${values}${fallback}${about}`);
				}
				out.push('');
			}
		}
	}
	return out.join('\n');
}
