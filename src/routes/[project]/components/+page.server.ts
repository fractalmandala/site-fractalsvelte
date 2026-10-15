import { error } from '@sveltejs/kit';
import { libraries } from '#lib/server/components.js';
import { absolute, itemList, softwareId, type Seo } from '#lib/seo.js';
import { findProject } from '#lib/site.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => Object.keys(libraries).map((project) => ({ project }));

export const load: PageServerLoad = ({ params }) => {
	const project = findProject(params.project);
	const library = libraries[params.project];
	if (!project || !library) error(404, 'No component reference for this package');

	const path = `/${project.slug}/components`;
	const count = library.components.length;
	const kinds = library.groups
		.map((g) => g.label.toLowerCase())
		.slice(0, 3)
		.join(', ');
	const seo: Seo = {
		title: `${count} Svelte 5 components — ${project.slug}`,
		description: `All ${count} ${project.slug} components for Svelte 5 and SvelteKit (${kinds} and more), with props, snippets and copy-paste examples.`,
		path,
		imageAlt: `${count} Svelte 5 components in ${project.slug}`,
		modified: project.packages[0].published,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: project.slug, path: `/${project.slug}` },
			{ name: 'Components', path }
		],
		jsonLd: [
			{
				'@type': 'CollectionPage',
				name: `${project.slug} components`,
				url: absolute(path),
				about: { '@id': softwareId(`/${project.slug}`) },
				mainEntity: itemList(
					library.components.map((c) => ({ name: c.name, path: `${path}/${c.slug}` }))
				)
			}
		]
	};

	return {
		seo,
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
