import { canonicalizeLang, highlight } from '@fractaldesign/pop/full';

/** Highlights code with fractalpop. Unknown or missing languages render as plain text. */
export function highlightCode(code: string, lang?: string) {
	const id = (lang && canonicalizeLang(lang)) || 'plaintext';
	return highlight(code.replace(/\n$/, ''), { lang: id });
}

export function highlightSnippets<T extends { code: string; lang: string }>(snippets: T[]) {
	return snippets.map((s) => ({ ...s, html: highlightCode(s.code, s.lang) }));
}
