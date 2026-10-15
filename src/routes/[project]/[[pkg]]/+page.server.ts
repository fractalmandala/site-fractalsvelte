import { error } from '@sveltejs/kit';
import { libraries } from '#lib/server/components.js';
import { highlightSnippets } from '#lib/server/highlight.js';
import { softwareSourceCode, type Seo } from '#lib/seo.js';
import { findPackage, findProject, projects } from '#lib/site.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	projects.flatMap((project) =>
		project.packages.map((p) => ({ project: project.slug, pkg: p.slug ?? '' }))
	);

export const load: PageServerLoad = ({ params }) => {
	const project = findProject(params.project);
	const pkg = project && findPackage(project, params.pkg);
	if (!project || !pkg) error(404, 'No such package');

	const isMain = pkg === project.packages[0];
	const path = isMain ? `/${project.slug}` : `/${project.slug}/${pkg.slug}`;
	const short = pkg.name.replace('@fractaldesign/', '');
	const seo: Seo = {
		...(isMain ? project.seo : (pkg.seo ?? { title: short, description: pkg.description })),
		path,
		imageAlt: `${pkg.name}: ${isMain ? project.kind : pkg.role}`,
		modified: pkg.published,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: project.slug, path: `/${project.slug}` },
			...(isMain ? [] : [{ name: short, path }])
		],
		jsonLd: [softwareSourceCode(project, pkg, path)]
	};

	return {
		seo,
		project,
		pkg,
		isMain,
		componentCount: libraries[project.slug]?.components.length ?? 0,
		quickstart: isMain ? highlightSnippets(project.quickstart) : []
	};
};
