// Lazy demo components, one glob for every library: adding a library means adding
// src/lib/<id>/demos/<slug>.svelte, nothing else.
import type { DemoLoader } from './examples.js';

const modules = import.meta.glob<{ default: import('svelte').Component }>(
	'/src/lib/*/demos/*.svelte'
);

const key = (setId: string, slug: string) => `/src/lib/${setId}/demos/${slug}.svelte`;

export function demoLoader(setId: string, slug: string): DemoLoader | undefined {
	return modules[key(setId, slug)];
}
