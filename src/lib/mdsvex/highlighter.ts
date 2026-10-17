// mdsvex highlighter: fractalpop's mdsvex adapter does the highlighting (and the
// Svelte escaping). This wraps the tokens in the same code frame that
// components/CodeBlock.svelte renders for component pages, so every code block
// on the site looks the same. The Copy button is wired by one delegated listener
// in DocLayout.
import { fractalpopHighlighter } from '@fractaldesign/pop-mdsvex';

// Same glyph as CopyButton.svelte (lucide "copy").
const COPY_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

export function highlighter(code: string, lang?: string | null, meta?: string | null): string {
	const html = fractalpopHighlighter(code, lang ?? undefined, meta ?? undefined);
	// CodeBlock puts only the token spans inside its own <pre><code>, so unwrap them.
	const tokens = html.match(/<code[^>]*>([\s\S]*)<\/code>/)?.[1] ?? html;
	const label = (lang ?? '').replace(/[^\w+-]/g, '') || 'text';
	return (
		'<figure class="box border radius-sm bg-raised minw0">' +
		'<figcaption class="row ycenter xbetween gap-sm px-sm bb text-sm text-primary bg-panel">' +
		`<span class="truncate">${label}</span>` +
		'<button type="button" data-variant="iconbox" data-size="icon-bs" class="px-xs text-secondary" aria-label="Copy code" title="Copy code" data-copy>' +
		COPY_ICON +
		'</button>' +
		'</figcaption>' +
		`<pre class="pad-md scroll-x text-md lh16"><code>${tokens}</code></pre>` +
		'</figure>'
	);
}
