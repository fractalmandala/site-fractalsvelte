import { error } from '@sveltejs/kit';
import { loadGuide } from '#lib/content.js';
import { clamp, fitTitle, softwareId, techArticle, type Seo } from '#lib/seo.js';
import { findProject, guides } from '#lib/site.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	Object.entries(guides).flatMap(([project, list]) =>
		(list ?? []).map((g) => ({ project, doc: g.slug }))
	);

export const load: PageLoad = async ({ params }) => {
	const project = findProject(params.project);
	const list = guides[params.project] ?? [];
	const index = list.findIndex((g) => g.slug === params.doc);
	const doc = project && index >= 0 ? await loadGuide(params.project, params.doc) : undefined;
	if (!project || !doc) error(404, 'No such guide');

	const path = `/${project.slug}/docs/${params.doc}`;
	const seo: Seo = {
		title: fitTitle(
			`${doc.meta.title} — ${project.slug} docs for SvelteKit`,
			`${doc.meta.title} — ${project.slug} docs`,
			doc.meta.title
		),
		description: clamp(doc.meta.description ?? project.seo.description),
		path,
		imageAlt: `${doc.meta.title}, from the ${project.slug} documentation`,
		type: 'article',
		modified: project.packages[0].published,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: project.slug, path: `/${project.slug}` },
			{ name: doc.meta.title, path }
		]
	};
	seo.jsonLd = [techArticle(seo, softwareId(`/${project.slug}`))];

	return { seo, project, doc, previous: list[index - 1], next: list[index + 1] };
};
