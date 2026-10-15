// llms.txt (an index, per llmstxt.org) and llms-full.txt (every doc as plain
// markdown), so AI assistants and AI search can read and cite the docs.
import { absolute } from '#lib/seo.js';
import { guides, projects } from '#lib/site.js';
import { libraries } from './components';
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
		const library = libraries[project.slug];
		if (!library) continue;
		out.push(`## ${project.slug} component reference`, '');
		for (const c of library.components) {
			out.push(`### ${c.name}`, '', c.description, '');
			if (c.imports) out.push('```ts', c.imports, '```', '');
			for (const example of c.examples) out.push('```svelte', example, '```', '');
			if (c.props.length) {
				out.push('Props:', '');
				for (const p of c.props) {
					const values = p.values ? ` (${p.values})` : '';
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
