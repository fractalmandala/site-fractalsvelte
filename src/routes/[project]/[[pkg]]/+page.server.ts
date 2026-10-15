import { error } from '@sveltejs/kit';
import { highlightSnippets } from '#lib/server/highlight.js';
import { renderReadme } from '#lib/server/markdown.js';
import { findPackage, findProject, projects } from '#lib/site.js';
import type { EntryGenerator, PageServerLoad } from './$types';

const readmes = import.meta.glob<string>('/src/content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

/** Section ids the page itself uses around the README. */
const SECTION_IDS = ['setup', 'usage', 'features', 'family', 'documentation'];

export const entries: EntryGenerator = () =>
	projects.flatMap((project) =>
		project.packages.map((p) => ({ project: project.slug, pkg: p.slug ?? '' }))
	);

export const load: PageServerLoad = ({ params }) => {
	const project = findProject(params.project);
	const pkg = project && findPackage(project, params.pkg);
	if (!project || !pkg) error(404, 'No such package');

	const source = readmes[`/src/content/${pkg.readme}.md`];
	if (source === undefined) error(500, `README for ${pkg.name} is missing — run pnpm docs:sync`);

	const isMain = pkg === project.packages[0];
	const readme = renderReadme(source, {
		repo: project.repo,
		repoPath: pkg.repoPath,
		reserved: SECTION_IDS
	});

	return {
		project,
		pkg,
		isMain,
		readme,
		quickstart: isMain ? highlightSnippets(project.quickstart) : []
	};
};
