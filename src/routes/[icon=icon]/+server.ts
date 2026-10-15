import { ImageResponse } from '@ethercorps/sveltekit-og';
import Icon from '#og/Icon.svelte';
import { ogFonts } from '#og/fonts.js';
import { ICONS, type IconFile } from '#lib/icons.js';
import type { EntryGenerator, RequestHandler } from './$types';

// Favicon, Apple touch icon and manifest icons, drawn from one template at build time.
export const prerender = true;

export const entries: EntryGenerator = () =>
	(Object.keys(ICONS) as IconFile[]).map((icon) => ({ icon }));

export const GET: RequestHandler = async ({ params }) => {
	const size = ICONS[params.icon as IconFile];
	return new ImageResponse(Icon, { width: size, height: size, fonts: await ogFonts() }, { size });
};
