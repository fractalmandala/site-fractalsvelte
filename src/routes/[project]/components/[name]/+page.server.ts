import { error } from '@sveltejs/kit';
import { libraries } from '#lib/server/components.js';
import { highlightCode } from '#lib/server/highlight.js';
import { clamp, fitTitle, softwareId, techArticle, type Seo } from '#lib/seo.js';
import { findProject, installLines } from '#lib/site.js';
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
	// Up to six neighbours from the same group, wrapping around — internal links for readers and crawlers.
	const related = Array.from({ length: Math.min(6, siblings.length - 1) }, (_, i) => {
		const c = siblings[(at + i + 1) % siblings.length];
		return { slug: c.slug, name: c.name, description: clamp(c.description, 110) };
	});

	const pkg = project.packages[0];
	const base = `/${project.slug}/components`;
	const path = `${base}/${component.slug}`;
	const seo: Seo = {
		title: fitTitle(
			`${component.name} — Svelte 5 ${component.phrase} component · ${project.slug}`,
			`${component.name} — Svelte 5 ${component.phrase} component`,
			`${component.name} — Svelte 5 component · ${project.slug}`,
			`${component.name} — Svelte 5 component`
		),
		description: clamp(
			`A Svelte 5 ${component.phrase} component for SvelteKit. ${component.description}`
		),
		path,
		imageAlt: `${component.name}, a Svelte 5 ${component.phrase} component from ${project.slug}`,
		type: 'article',
		modified: pkg.published,
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: project.slug, path: `/${project.slug}` },
			{ name: 'Components', path: base },
			{ name: component.name, path }
		]
	};
	seo.jsonLd = [techArticle(seo, softwareId(`/${project.slug}`))];

	return {
		seo,
		project,
		group: group?.label ?? component.group,
		install: installLines(pkg),
		related,
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
