import { error } from '@sveltejs/kit';
import { loadReadme } from '#lib/content.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const readme = await loadReadme(data.pkg.readme);
	if (!readme) error(500, `README for ${data.pkg.name} is missing — run pnpm docs:sync`);
	return { ...data, readme };
};
