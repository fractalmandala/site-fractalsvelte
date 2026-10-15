import { GITHUB, type Package, type Project } from './site';

export const SITE_URL = 'https://fractalsvelte.dev';
export const SITE_NAME = 'fractalsvelte';

export type Crumb = { name: string; path: string };
type JsonLd = Record<string, unknown>;

/** Everything a page tells search engines and social cards about itself. */
export type Seo = {
	title: string;
	description: string;
	/** Route path, e.g. `/fractalpop/svelte` — becomes the canonical URL */
	path: string;
	imageAlt: string;
	type?: 'website' | 'article';
	breadcrumbs?: Crumb[];
	/** Page-specific JSON-LD nodes, merged into the site graph */
	jsonLd?: JsonLd[];
	/** ISO date the content last changed */
	modified?: string;
};

export const absolute = (path: string) => new URL(path, SITE_URL).href;

/** Every page has a prerendered share image at /og/<path>.png */
export const ogImagePath = (path: string) => `/og${path === '/' ? '/index' : path}.png`;

/** The first candidate that fits Google's ~60 character title width. */
export function fitTitle(...candidates: string[]) {
	return candidates.find((t) => t.length <= 60) ?? candidates[candidates.length - 1];
}

/** Trims to whole sentences within `max`, falling back to a word boundary. */
export function clamp(text: string, max = 158) {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	let out = '';
	for (const sentence of clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? []) {
		if ((out + sentence).trim().length > max) break;
		out += sentence;
	}
	if (out.trim()) return out.trim();
	return clean.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const organization: JsonLd = {
	'@type': 'Organization',
	'@id': ORG_ID,
	name: 'Fractal Mandala',
	url: SITE_URL,
	logo: absolute('/icon-512.png'),
	sameAs: [GITHUB, 'https://www.npmjs.com/org/fractaldesign']
};

export const website: JsonLd = {
	'@type': 'WebSite',
	'@id': SITE_ID,
	url: SITE_URL,
	name: SITE_NAME,
	description:
		'Svelte 5 and SvelteKit packages: a component library, character-drawn components, a styling system and a syntax highlighter.',
	inLanguage: 'en',
	publisher: { '@id': ORG_ID }
};

export function breadcrumbList(crumbs: Crumb[]): JsonLd {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: absolute(c.path)
		}))
	};
}

export const softwareId = (path: string) => `${absolute(path)}#software`;

/** A package as source code: what it is, where it lives, how it's licensed. */
export function softwareSourceCode(project: Project, pkg: Package, path: string): JsonLd {
	return {
		'@type': 'SoftwareSourceCode',
		'@id': softwareId(path),
		name: pkg.name,
		description: pkg.description,
		url: absolute(path),
		codeRepository: project.repo,
		programmingLanguage: ['TypeScript', 'Svelte'],
		runtimePlatform: 'Svelte 5',
		version: pkg.version,
		license: 'https://opensource.org/licenses/MIT',
		dateModified: pkg.published,
		author: { '@id': ORG_ID },
		publisher: { '@id': ORG_ID }
	};
}

export function techArticle(seo: Seo, about: string): JsonLd {
	return {
		'@type': 'TechArticle',
		headline: seo.title,
		description: seo.description,
		url: absolute(seo.path),
		image: absolute(ogImagePath(seo.path)),
		inLanguage: 'en',
		...(seo.modified && { dateModified: seo.modified }),
		author: { '@id': ORG_ID },
		publisher: { '@id': ORG_ID },
		isPartOf: { '@id': SITE_ID },
		about: { '@id': about }
	};
}

export function itemList(items: { name: string; path: string }[]): JsonLd {
	return {
		'@type': 'ItemList',
		numberOfItems: items.length,
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			url: absolute(item.path)
		}))
	};
}
