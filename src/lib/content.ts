import type { Component } from 'svelte';

export type TocEntry = { depth: number; id: string; text: string };
export type DocMeta = { title: string; description?: string; source: string; toc: TocEntry[] };
type DocModule = { default: Component; metadata: DocMeta };

// mdsvex pages written by scripts/sync-docs.mjs (READMEs) and scripts/copy-docs.mjs (guides)
const readmes = import.meta.glob<DocModule>('/src/content/readme/*.md');
const guides = import.meta.glob<DocModule>('/src/content/docs/*/*.md');

async function load(modules: Record<string, () => Promise<DocModule>>, key: string) {
	const loader = modules[key];
	if (!loader) return undefined;
	const mod = await loader();
	return { component: mod.default, meta: mod.metadata };
}

export const loadReadme = (name: string) => load(readmes, `/src/content/readme/${name}.md`);
export const loadGuide = (project: string, slug: string) =>
	load(guides, `/src/content/docs/${project}/${slug}.md`);
