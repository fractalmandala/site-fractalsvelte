// mdsvex highlighter: fractalpop's mdsvex adapter does the highlighting (and the
// Svelte escaping); this wraps its <pre> in the site's code frame. The Copy
// button is wired by one delegated listener in DocLayout.
import { fractalpopHighlighter } from '@fractaldesign/pop-mdsvex';

/**
 * @param {string} code
 * @param {string | null | undefined} lang
 * @param {string | null | undefined} meta
 */
export function highlighter(code, lang, meta) {
	const html = fractalpopHighlighter(code, lang ?? undefined, meta ?? undefined);
	const label = (lang ?? '').replace(/[^\w+-]/g, '') || 'text';
	return (
		'<figure class="box border radius-sm bg-sunken minw0">' +
		'<figcaption class="row ycenter xbetween px-md py-xs bb text-sm text-muted">' +
		`<span>${label}</span>` +
		'<button type="button" data-variant="ghost" data-size="sm" data-copy>Copy</button>' +
		'</figcaption>' +
		html.replace('<pre class="', '<pre class="pad-md scroll-x text-md lh16 ') +
		'</figure>'
	);
}
