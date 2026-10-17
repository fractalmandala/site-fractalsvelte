// Every page on the site, with what its share image says. One list feeds the
// share images, the sitemap and llms.txt, so none of them can drift from the routes.
import { clamp } from '#lib/seo.js';
import { guides, packageCount, packageHref, projects, type Package } from '#lib/site.js';
import { docSets, groupLabel } from './docs/registry.js';

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
	}

	// Live component docs: one index page and one page per component for every set in
	// the docs registry, so a new library's pages appear here automatically.
	for (const set of docSets) {
		pages.push({
			path: set.base,
			name: `${set.title} components`,
			description: `Live documentation for all ${set.components.length} ${set.title} components.`,
			section: 'Component docs',
			card: {
				caption: 'Live docs',
				eyebrow: `${set.title} · Svelte 5`,
				title: `${set.components.length} components`,
				subtitle: set.groups.map((g) => g.label).join(' · '),
				code: set.install
			}
		});
		for (const c of set.components) {
			pages.push({
				path: `${set.base}/${c.slug}`,
				name: `${c.displayName} (${set.title}, live)`,
				description: c.description,
				section: `${set.title} live docs`,
				card: {
					caption: groupLabel(set, c.group),
					eyebrow: `Svelte 5 component · ${set.title}`,
					title: c.displayName,
					subtitle: clamp(c.description, 120),
					code: c.importSnippet ?? `import { ${c.name} }`
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
