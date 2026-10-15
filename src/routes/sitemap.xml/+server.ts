import { absolute } from '#lib/seo.js';
import { sitePages } from '#lib/server/pages.js';

export const prerender = true;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const GET = () => {
	const urls = sitePages
		.map(
			(page) =>
				`\t<url>\n\t\t<loc>${escape(absolute(page.path))}</loc>\n` +
				(page.modified ? `\t\t<lastmod>${page.modified.slice(0, 10)}</lastmod>\n` : '') +
				`\t</url>`
		)
		.join('\n');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
