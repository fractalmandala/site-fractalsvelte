import { error } from '@sveltejs/kit';
import { libraries } from '#lib/server/components.js';
import { findProject } from '#lib/site.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => Object.keys(libraries).map((project) => ({ project }));

export const load: PageServerLoad = ({ params }) => {
	const project = findProject(params.project);
	const library = libraries[params.project];
	if (!project || !library) error(404, 'No component reference for this package');

	return {
		project,
		origin: library.origin,
		groups: library.groups.map((group) => ({
			...group,
			components: library.components
				.filter((c) => c.group === group.id)
				.map(({ slug, name, description }) => ({ slug, name, description }))
		}))
	};
};
