// Audits the built site: every class in the prerendered HTML must come from the
// fractalstyler registry or the site's own extension layer (_09_own.sass).
// fractalstyler's linter covers .svelte files; this also covers HTML generated
// in TypeScript, such as the rendered READMEs. Run after `pnpm build`.
import fs from 'node:fs';
import path from 'node:path';

// registry.json ships in the package but isn't in its exports map, so read it from disk.
const registry: { class: string }[] = JSON.parse(
	fs.readFileSync('node_modules/@fractaldesign/fractalstyler/registry.json', 'utf8')
);
const own = fs.readFileSync('src/lib/styles/_09_own.sass', 'utf8');

const allowed = new Set<string>();
for (const { class: selector } of registry)
	for (const m of selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) allowed.add(m[1]);
for (const m of own.matchAll(/\.([a-zA-Z][\w-]*)/g)) allowed.add(m[1]);
// Markup owned by other packages: fractalpop's tokens (themed through --fp-*
// variables) and fractalicons' root class.
const external = /^(fp(__|-lang--|$)|fractalicon$)/;
// The live component docs render the libraries' own markup. Their classes are the
// names the installed packages' published components emit (and define), never
// the site's: read them straight from node_modules. An element carrying a Svelte
// scope hash was rendered by a library too — the site has no <style> blocks.
const liveDocs = /^(fractalsvelte-ui|machines-ui)\//;
const scoped = /(^|\s)svelte-[a-z0-9]+(\s|$)/;
const libraryClasses = new Set<string>();
for (const pkg of ['fractalsvelte-ui', 'machines-ui']) {
	const dist = `node_modules/@fractaldesign/${pkg}/dist`;
	for (const file of fs.readdirSync(dist, { recursive: true, encoding: 'utf8' })) {
		if (!/\.(svelte|css|js)$/.test(file)) continue;
		const source = fs.readFileSync(path.join(dist, file), 'utf8');
		for (const [, value] of source.matchAll(/class="([^"]*)"/g))
			for (const name of value.replace(/\{[^}]*\}/g, ' ').split(/\s+/))
				if (name) libraryClasses.add(name);
		for (const [, name] of source.matchAll(/class:([\w-]+)/g)) libraryClasses.add(name);
		// class names built in script (clsx lists, className props): hyphenated words in strings
		for (const [, text] of source.matchAll(/['"`]([^'"`\n]*)['"`]/g))
			for (const name of text.split(/\s+/))
				if (/^[a-z][\w]*(-[\w]+)+$/.test(name)) libraryClasses.add(name);
		const css = file.endsWith('.css')
			? source
			: [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
		for (const [, name] of css.matchAll(/\.([a-zA-Z][\w-]*)/g)) libraryClasses.add(name);
	}
}

const pagesDir = '.svelte-kit/output/prerendered/pages';
const pages = fs
	.readdirSync(pagesDir, { recursive: true, encoding: 'utf8' })
	.filter((f) => f.endsWith('.html'));
if (!pages.length) throw new Error('No prerendered pages — run pnpm build first');

const unknown = new Map<string, Set<string>>();
for (const page of pages) {
	const html = fs.readFileSync(path.join(pagesDir, page), 'utf8');
	for (const [, value] of html.matchAll(/<[a-zA-Z][^<>]*?\sclass="([^"]*)"/g)) {
		if (liveDocs.test(page) && scoped.test(value)) continue;
		for (const name of value.split(/\s+/).filter(Boolean))
			if (
				!allowed.has(name) &&
				!external.test(name) &&
				!(liveDocs.test(page) && libraryClasses.has(name))
			)
				unknown.set(name, (unknown.get(name) ?? new Set()).add(page));
	}
}

if (unknown.size) {
	for (const [name, where] of unknown)
		console.error(`unknown class .${name} in ${[...where].join(', ')}`);
	process.exit(1);
}
console.log(`✔ ${pages.length} pages: every class resolves to fractalstyler, _09_own.sass, or (on the live docs) the installed library`);
