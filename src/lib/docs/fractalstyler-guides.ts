// The fractalstyler usage guides live as markdown in the app's own docs/ folder.
// Vite compiles them with mdsvex and remark-headings turns each page's h2/h3
// outline into metadata.toc. The docs layout (left rail) and the dynamic page
// (doc body) both read this one module, so the list cannot drift.
import type { Component } from 'svelte';
import type { TocEntry } from '#lib/content.js';

type GuideMeta = {
	title: string;
	slug?: string;
	description?: string;
	id?: number;
	toc?: TocEntry[];
};
type GuideModule = { default: Component; metadata: GuideMeta };

const modules = import.meta.glob<GuideModule>('/docs/fractalstyler/*.md', { eager: true });

export type Guide = {
	slug: string;
	title: string;
	description: string;
	id: number;
	component: Component;
	toc: TocEntry[];
};

const clean = (text: string) => text.replace(/\s+/g, ' ').trim();

export const guides: Guide[] = Object.entries(modules)
	.map(([file, mod]) => ({
		slug: mod.metadata.slug ?? file.replace(/^.*\//, '').replace(/\.md$/, ''),
		title: clean(mod.metadata.title),
		description: mod.metadata.description ? clean(mod.metadata.description) : '',
		id: mod.metadata.id ?? 0,
		component: mod.default,
		toc: mod.metadata.toc ?? []
	}))
	.sort((a, b) => a.id - b.id || a.slug.localeCompare(b.slug));

export const findGuide = (slug: string) => guides.find((g) => g.slug === slug);
