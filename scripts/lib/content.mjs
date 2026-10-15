// Shared by the content scripts: turns a package's markdown into an mdsvex page.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** npm package pages for packages documented on this site, mapped to their pages here. */
export const INTERNAL_LINKS = {
	'https://www.npmjs.com/package/@fractaldesign/fractalstyler': '/fractalstyler',
	'https://www.npmjs.com/package/@fractaldesign/fractalsvelte-ui': '/fractalsvelte-ui',
	'https://www.npmjs.com/package/@fractaldesign/machines-ui': '/machines-ui',
	'https://www.npmjs.com/package/@fractaldesign/pop': '/fractalpop',
	'https://www.npmjs.com/package/fractalpop': '/fractalpop',
	'https://www.npmjs.com/package/@fractaldesign/pop-svelte': '/fractalpop/svelte',
	'https://www.npmjs.com/package/@fractaldesign/pop-mdsvex': '/fractalpop/mdsvex',
	'https://www.npmjs.com/package/@fractaldesign/pop-remark': '/fractalpop/remark'
};

const yaml = (value) => JSON.stringify(value);

/** Applies `fn` to prose only — never inside fenced code or inline code spans. */
function mapProse(markdown, fn) {
	const out = [];
	let fence = null;
	let prose = [];
	const flush = () => {
		if (!prose.length) return;
		const text = prose.join('\n');
		// inline code spans (any backtick run length) pass through untouched
		let result = '';
		const re = /(`+)([\s\S]*?[^`]|[^`])\1(?!`)/g;
		let last = 0;
		for (const m of text.matchAll(re)) {
			result += fn(text.slice(last, m.index)) + m[0];
			last = m.index + m[0].length;
		}
		out.push(result + fn(text.slice(last)));
		prose = [];
	};
	for (const line of markdown.split('\n')) {
		const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
		if (fence) {
			out.push(line);
			if (marker && marker[0] === fence[0] && marker.length >= fence.length) fence = null;
		} else if (marker) {
			flush();
			fence = marker;
			out.push(line);
		} else {
			prose.push(line);
		}
	}
	flush();
	return out.join('\n');
}

/**
 * Converts package markdown into an mdsvex page: replaces any frontmatter with
 * the page's own, turns <https://…> autolinks into links, escapes the braces and
 * angle brackets Svelte would read as code (unless `html` keeps deliberate
 * markup), resolves relative links against the repo and points npm links for
 * documented packages at their pages here.
 */
export function toMdsvex(markdown, { title, description, source, blobBase, html = false }) {
	const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
	const resolve = (href) => {
		if (INTERNAL_LINKS[href]) return INTERNAL_LINKS[href];
		if (href.startsWith('#') || /^[a-z]+:/i.test(href) || href.startsWith('/')) return href;
		return blobBase + href.replace(/^\.\//, '');
	};
	const converted = mapProse(body, (text) =>
		text
			.replace(/<(https?:\/\/[^>\s]+)>/g, '[$1]($1)')
			.replace(html ? /(?!)/g : /<(?!!--)/g, '&lt;')
			.replace(
				/\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g,
				(_, href, title) => `](${resolve(href)}${title})`
			)
			.replace(/\{/g, '&#123;')
			.replace(/\}/g, '&#125;')
	);
	const fm = [
		'---',
		`title: ${yaml(title)}`,
		...(description ? [`description: ${yaml(description)}`] : []),
		`source: ${yaml(source)}`,
		'---',
		''
	];
	return fm.join('\n') + converted.trim() + '\n';
}

export async function writeFile(rel, contents) {
	const file = path.join(ROOT, rel);
	await fs.mkdir(path.dirname(file), { recursive: true });
	await fs.writeFile(file, contents);
}
