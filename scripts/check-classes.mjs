// Audits the built site: every class in the prerendered HTML must come from the
// fractalstyler registry or the site's own extension layer (_09_own.sass).
// fractalstyler's linter covers .svelte files; this also covers HTML generated
// in TypeScript, such as the rendered READMEs. Run after `pnpm build`.
import fs from 'node:fs';
import path from 'node:path';

// registry.json ships in the package but isn't in its exports map, so read it from disk.
const registry = JSON.parse(
	fs.readFileSync('node_modules/@fractaldesign/fractalstyler/registry.json', 'utf8')
);
const own = fs.readFileSync('src/lib/styles/_09_own.sass', 'utf8');

const allowed = new Set();
for (const { class: selector } of registry)
	for (const m of selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) allowed.add(m[1]);
for (const m of own.matchAll(/\.([a-zA-Z][\w-]*)/g)) allowed.add(m[1]);
// Markup owned by other packages: fractalpop's tokens (themed through --fp-*
// variables) and fractalicons' root class.
const external = /^(fp(__|$)|fractalicon$)/;

const pagesDir = '.svelte-kit/output/prerendered/pages';
const pages = fs.readdirSync(pagesDir, { recursive: true }).filter((f) => f.endsWith('.html'));
if (!pages.length) throw new Error('No prerendered pages — run pnpm build first');

const unknown = new Map();
for (const page of pages) {
	const html = fs.readFileSync(path.join(pagesDir, page), 'utf8');
	for (const [, value] of html.matchAll(/<[a-zA-Z][^<>]*?\sclass="([^"]*)"/g))
		for (const name of value.split(/\s+/).filter(Boolean))
			if (!allowed.has(name) && !external.test(name))
				unknown.set(name, (unknown.get(name) ?? new Set()).add(page));
}

if (unknown.size) {
	for (const [name, where] of unknown)
		console.error(`unknown class .${name} in ${[...where].join(', ')}`);
	process.exit(1);
}
console.log(`✔ ${pages.length} pages: every class resolves to fractalstyler or _09_own.sass`);
