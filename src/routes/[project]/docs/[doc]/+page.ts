import { error } from '@sveltejs/kit';
import { loadGuide } from '#lib/content.js';
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

	return { project, doc, previous: list[index - 1], next: list[index + 1] };
};
