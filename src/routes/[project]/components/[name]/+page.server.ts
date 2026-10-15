import { error } from '@sveltejs/kit';
import { libraries } from '#lib/server/components.js';
import { highlightCode } from '#lib/server/highlight.js';
import { findProject } from '#lib/site.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	Object.entries(libraries).flatMap(([project, library]) =>
		library.components.map((c) => ({ project, name: c.slug }))
	);

export const load: PageServerLoad = ({ params }) => {
	const project = findProject(params.project);
	const library = libraries[params.project];
	const index = library?.components.findIndex((c) => c.slug === params.name) ?? -1;
	if (!project || !library || index < 0) error(404, 'No such component');

	const component = library.components[index];
	const group = library.groups.find((g) => g.id === component.group);
	const siblings = library.components.filter((c) => c.group === component.group);
	const at = siblings.indexOf(component);
	const link = (c?: (typeof siblings)[number]) => (c ? { slug: c.slug, name: c.name } : undefined);

	return {
		project,
		group: group?.label ?? component.group,
		component: {
			...component,
			imports: component.imports && {
				code: component.imports,
				html: highlightCode(component.imports, 'ts')
			},
			examples: component.examples.map((code) => ({ code, html: highlightCode(code, 'svelte') })),
			source: component.source && {
				code: component.source,
				html: highlightCode(component.source, 'svelte')
			}
		},
		previous: link(siblings[at - 1]),
		next: link(siblings[at + 1])
	};
};
