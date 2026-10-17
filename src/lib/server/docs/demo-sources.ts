// Server-side view of the demo sources: every demo is read once, eagerly, so a
// component page can show the exact code behind its preview and, for machines-ui,
// hand each <Example> block its own markup.
const sources = import.meta.glob<string>('/src/lib/*/demos/*.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
});

export function demoSource(setId: string, slug: string): string | undefined {
	return sources[`/src/lib/${setId}/demos/${slug}.svelte`];
}
