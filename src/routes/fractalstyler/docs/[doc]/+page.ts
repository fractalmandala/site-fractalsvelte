import { error } from '@sveltejs/kit';
import { guides } from '#lib/docs/fractalstyler-guides.js';
import { clamp, fitTitle, softwareId, techArticle, type Seo } from '#lib/seo.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => guides.map((g) => ({ doc: g.slug }));

export const load: PageLoad = ({ params }) => {
	const guide = guides.find((g) => g.slug === params.doc);
	if (!guide) error(404, 'No such guide');

	const path = `/fractalstyler/docs/${guide.slug}`;
	const seo: Seo = {
		title: fitTitle(`${guide.title} — fractalstyler docs`, `${guide.title} — fractalstyler`),
		description: clamp(guide.description || `${guide.title}, from the fractalstyler guides.`),
		path,
		imageAlt: `${guide.title}, from the fractalstyler documentation`,
		type: 'article',
		breadcrumbs: [
			{ name: 'fractalsvelte', path: '/' },
			{ name: 'fractalstyler', path: '/fractalstyler' },
			{ name: guide.title, path }
		]
	};
	seo.jsonLd = [techArticle(seo, softwareId('/fractalstyler'))];

	return { seo, toc: guide.toc };
};
