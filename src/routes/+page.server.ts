import { highlightSnippets } from '#lib/server/highlight.js';
import { projects } from '#lib/site.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({
	// One representative snippet per project, highlighted at build time.
	starters: projects.map((p) => ({ slug: p.slug, ...highlightSnippets([p.quickstart.at(-1)!])[0] }))
});
