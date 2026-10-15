import { error } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import Card from '#og/Card.svelte';
import { ogFonts } from '#og/fonts.js';
import { ogImagePath } from '#lib/seo.js';
import { findPage, sitePages } from '#lib/server/pages.js';
import type { EntryGenerator, RequestHandler } from './$types';

// One 1200×630 share image per page, rendered once at build time.
export const prerender = true;

export const entries: EntryGenerator = () =>
	sitePages.map((page) => ({ path: ogImagePath(page.path).slice('/og/'.length) }));

export const GET: RequestHandler = async ({ params }) => {
	const route = params.path.replace(/\.png$/, '');
	const page = findPage(route === 'index' ? '/' : `/${route}`);
	if (!page) error(404, 'No share image for this path');

	return new ImageResponse(Card, { width: 1200, height: 630, fonts: await ogFonts() }, page.card);
};
