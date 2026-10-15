// Every page on the site, with what its share image says. One list feeds the
// share images, the sitemap and llms.txt, so none of them can drift from the routes.
import { clamp } from '#lib/seo.js';
import { guides, packageCount, packageHref, projects, type Package } from '#lib/site.js';
import { libraries } from './components';

export type Card = {
	caption: string;
	eyebrow: string;
	title?: string;
	mark?: [string, string];
	subtitle?: string;
	code?: string;
};

export type SitePage = {
	path: string;
	name: string;
	description: string;
	/** Where it sits in llms.txt */
	section: string;
	modified?: string;
	card: Card;
};

const install = (p: Package) => `pnpm add ${p.dev ? '-D ' : ''}${p.name}`;

/**
 * satori-html (inside sveltekit-og) doesn't decode HTML entities, so the `&` and
 * `<` Svelte escapes would print literally. Keep card text free of both.
 */
function cardText<T extends Card>(card: T): T {
	const clean = (text?: string) =>
		text?.replace(/\s&\s/g, ' and ').replace(/&/g, '+').replace(/</g, '‹');
	return {
		...card,
		eyebrow: clean(card.eyebrow)!,
		caption: clean(card.caption)!,
		title: clean(card.title),
		subtitle: clean(card.subtitle),
		code: clean(card.code)
	};
}

function build(): SitePage[] {
	const pages: SitePage[] = [
		{
			path: '/',
			name: 'fractalsvelte',
			description: 'Svelte 5 and SvelteKit packages: components, styling and syntax highlighting.',
			section: 'Overview',
			card: {
				caption: 'The suite',
				eyebrow: `${projects.length} projects · ${packageCount} packages`,
				mark: ['fractal', 'svelte'],
				subtitle: 'Svelte 5 and SvelteKit components, styling and syntax highlighting.',
				code: 'pnpm add @fractaldesign/fractalsvelte-ui'
			}
		}
	];

	for (const project of projects) {
		const main = project.packages[0];
		for (const pkg of project.packages) {
			const isMain = pkg === main;
			const short = pkg.name.replace('@fractaldesign/', '');
			const cut = short.lastIndexOf('-') + 1;
			pages.push({
				path: packageHref(project, pkg),
				name: pkg.name,
				description: isMain ? project.summary : pkg.description,
				section: project.slug,
				modified: pkg.published,
				card: {
					caption: isMain ? project.kind : project.slug,
					eyebrow: `v${pkg.version} · MIT · Svelte 5`,
					mark: isMain ? project.mark : [short.slice(0, cut), short.slice(cut)],
					subtitle: clamp(isMain ? project.summary : pkg.role, 120),
					code: install(pkg)
				}
			});
		}

		for (const guide of guides[project.slug] ?? []) {
			pages.push({
				path: `/${project.slug}/docs/${guide.slug}`,
				name: `${project.slug}: ${guide.title}`,
				description: guide.description,
				section: project.slug,
				modified: main.published,
				card: {
					caption: 'Docs',
					eyebrow: `${project.slug} documentation`,
					title: guide.title,
					subtitle: guide.description
				}
			});
		}

		const library = libraries[project.slug];
		if (!library) continue;
		const base = `/${project.slug}/components`;
		pages.push({
			path: base,
			name: `${project.slug} components`,
			description: `API reference for all ${library.components.length} ${project.slug} components.`,
			section: project.slug,
			modified: main.published,
			card: {
				caption: 'Components',
				eyebrow: `${project.slug} · Svelte 5`,
				title: `${library.components.length} components`,
				subtitle: library.groups.map((g) => g.label).join(' · '),
				code: install(main)
			}
		});
		for (const c of library.components) {
			const group = library.groups.find((g) => g.id === c.group)?.label ?? c.group;
			pages.push({
				path: `${base}/${c.slug}`,
				name: `${c.name} (${project.slug})`,
				description: c.description,
				section: `${project.slug} components`,
				modified: main.published,
				card: {
					caption: group,
					eyebrow: `Svelte 5 component · ${project.slug}`,
					title: c.name,
					subtitle: clamp(c.description, 120),
					code: `import { ${c.name} }`
				}
			});
		}
	}

	return pages.map((page) => ({ ...page, card: cardText(page.card) }));
}

export const sitePages = build();

export function findPage(path: string) {
	return sitePages.find((p) => p.path === path);
}
