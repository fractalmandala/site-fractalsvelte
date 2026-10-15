import { absolute } from '#lib/seo.js';

export const prerender = true;

export const GET = () =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
