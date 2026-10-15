import { Marked, type Tokens } from 'marked';
import { highlightCode } from './highlight';
import { projects, packageHref } from '#lib/site.js';

export type TocEntry = { depth: number; id: string; text: string };

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripTags = (s: string) => s.replace(/<[^>]*>/g, '');
const decode = (s: string) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");

const CODESPAN = 'bg-sunken radius-xs px-xs text-md text-primary';

/** GitHub-style heading slugs, so in-README anchors keep working. */
function slugger(reserved: string[]) {
	const seen = new Map(reserved.map((id) => [id, 1]));
	return (text: string) => {
		const base = text
			.toLowerCase()
			.trim()
			.replace(/[^\p{L}\p{N}\s_-]/gu, '')
			.replace(/\s/g, '-');
		const n = seen.get(base) ?? 0;
		seen.set(base, n + 1);
		return n ? `${base}-${n}` : base;
	};
}

/** npm links to packages documented on this site become internal links. */
const internal = new Map<string, string>(
	projects.flatMap((project) =>
		project.packages.map((p) => [
			`https://www.npmjs.com/package/${p.name}`,
			packageHref(project, p)
		])
	)
);
internal.set('https://www.npmjs.com/package/fractalpop', '/fractalpop');

type Options = {
	/** Repo root URL and the package's folder in it, for relative links */
	repo: string;
	repoPath: string;
	/** Heading ids already used by the page around the README */
	reserved: string[];
};

/**
 * Renders a README to HTML composed only from fractalstyler registry classes,
 * with code highlighted by fractalpop. The leading h1 is dropped: the page
 * already carries the package title.
 */
export function renderReadme(markdown: string, { repo, repoPath, reserved }: Options) {
	const toc: TocEntry[] = [];
	const slug = slugger(reserved);
	const blobBase = `${repo}/blob/main/${repoPath ? `${repoPath}/` : ''}`;

	const resolveHref = (href: string) => {
		if (href.startsWith('#') || /^[a-z]+:/i.test(href)) return internal.get(href) ?? href;
		return blobBase + href.replace(/^\.\//, '');
	};

	const marked = new Marked({
		gfm: true,
		renderer: {
			heading({ tokens, depth }) {
				if (depth === 1) return '';
				// Inline code in a heading takes the heading's size, not body-code size.
				const inner = this.parser
					.parseInline(tokens)
					.replaceAll(` class="${CODESPAN}"`, ' class="text-primary"');
				const text = decode(stripTags(inner));
				const id = slug(text);
				if (depth <= 3) toc.push({ depth, id, text });
				const cls =
					depth === 2
						? 'page-heading-xl text-primary pt-xl'
						: depth === 3
							? 'page-heading-lg text-primary pt-lg'
							: 'page-heading-bs text-primary pt-md';
				return `<h${depth} id="${id}" class="${cls}">${inner}</h${depth}>\n`;
			},
			paragraph({ tokens }) {
				return `<p class="text-body text-secondary lh16">${this.parser.parseInline(tokens)}</p>\n`;
			},
			strong({ tokens }) {
				return `<strong class="weight-600 text-primary">${this.parser.parseInline(tokens)}</strong>`;
			},
			codespan({ text }) {
				return `<code class="${CODESPAN}">${escapeHtml(text)}</code>`;
			},
			code({ text, lang }) {
				const language = (lang ?? '').split(/\s/)[0];
				return `<figure class="box border radius-sm bg-sunken">
<figcaption class="row ycenter xbetween px-md py-xs bb text-sm text-muted"><span>${escapeAttr(language || 'text')}</span><button type="button" data-variant="ghost" data-size="sm" data-copy>Copy</button></figcaption>
<pre class="pad-md scroll-x text-md lh16"><code>${highlightCode(text, language)}</code></pre>
</figure>\n`;
			},
			link({ href, title, tokens }) {
				const t = title ? ` title="${escapeAttr(title)}"` : '';
				return `<a href="${escapeAttr(resolveHref(href))}"${t} class="link">${this.parser.parseInline(tokens)}</a>`;
			},
			blockquote({ tokens }) {
				return `<blockquote class="box gap-sm bl-str pl-md">${this.parser.parse(tokens)}</blockquote>\n`;
			},
			hr() {
				return '<hr class="bt my-lg" />\n';
			},
			list(token: Tokens.List) {
				const tag = token.ordered ? 'ol' : 'ul';
				const start = typeof token.start === 'number' ? token.start : 1;
				const items = token.items
					.map((item, i) => {
						const marker = token.ordered
							? `<span class="text-muted shrink-0">${start + i}.</span>`
							: '<span class="text-theme shrink-0">+</span>';
						const body = this.parser.parse(item.tokens);
						return `<li class="row gap-sm text-body text-secondary lh16">${marker}<div class="box gap-xs minw0">${body}</div></li>`;
					})
					.join('');
				return `<${tag} class="box gap-xs">${items}</${tag}>\n`;
			},
			table(token: Tokens.Table) {
				const align = (a: string | null) =>
					a === 'right' ? ' ta-r' : a === 'center' ? ' ta-c' : ' ta-l';
				const head = token.header
					.map(
						(c) =>
							`<th class="px-md py-sm bb text-primary weight-600${align(c.align)}">${this.parser.parseInline(c.tokens)}</th>`
					)
					.join('');
				const rows = token.rows
					.map(
						(row) =>
							`<tr>${row
								.map(
									(c) =>
										`<td class="px-md py-sm bb-sub text-secondary${align(c.align)}">${this.parser.parseInline(c.tokens)}</td>`
								)
								.join('')}</tr>`
					)
					.join('');
				return `<div class="scroll-x border radius-sm"><table class="wfull text-md"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
			}
		}
	});

	const html = marked.parse(markdown, { async: false });
	return { html, toc };
}
