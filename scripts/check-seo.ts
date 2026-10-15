// Audits the built site's SEO, page by page: a unique title (≤60) and description
// (≤160), a canonical URL matching the route, a 1200×630 share image that exists,
// parseable JSON-LD and exactly one <h1>. Run after `pnpm build`.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://fractalsvelte.dev';
const dir = '.svelte-kit/output/prerendered/pages';
const files = fs
	.readdirSync(dir, { recursive: true, encoding: 'utf8' })
	.filter((f) => f.endsWith('.html'));
if (!files.length) throw new Error('No prerendered pages — run pnpm build first');

const decode = (s: string) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
const meta = (html: string, attr: string, key: string) =>
	decode(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`).exec(html)?.[1] ?? '');

function pngSize(file: string) {
	const b = fs.readFileSync(file);
	return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

const problems: string[] = [];
const seen = { title: new Map<string, string>(), description: new Map<string, string>() };

for (const file of files) {
	const route = '/' + file.replace(/\.html$/, '').replace(/^index$/, '');
	const html = fs.readFileSync(path.join(dir, file), 'utf8');
	const fail = (msg: string) => problems.push(`${route}: ${msg}`);

	const title = decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '');
	const description = meta(html, 'name', 'description');
	if (!title) fail('missing <title>');
	else if (title.length > 60) fail(`title is ${title.length} chars: "${title}"`);
	if (!description) fail('missing meta description');
	else if (description.length > 160) fail(`description is ${description.length} chars`);
	for (const [key, value] of [
		['title', title],
		['description', description]
	] as const) {
		if (!value) continue;
		if (seen[key].has(value)) fail(`${key} duplicates ${seen[key].get(value)}`);
		else seen[key].set(value, route);
	}

	const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
	if (canonical !== SITE + (route === '/' ? '/' : route)) fail(`canonical is ${canonical}`);
	if (/<meta name="robots" content="[^"]*noindex/.test(html)) fail('marked noindex');

	const image = meta(html, 'property', 'og:image');
	const imageFile = image.startsWith(SITE) && path.join(dir, image.slice(SITE.length));
	if (!imageFile || !fs.existsSync(imageFile)) fail(`share image missing: ${image}`);
	else if (pngSize(imageFile).join('x') !== '1200x630')
		fail(`share image is ${pngSize(imageFile).join('x')}`);
	if (!meta(html, 'property', 'og:image:alt')) fail('missing og:image:alt');

	const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)?.[1];
	try {
		const graph = JSON.parse(ld ?? '')['@graph'];
		if (!Array.isArray(graph) || graph.length < 2) fail('JSON-LD graph is incomplete');
	} catch {
		fail('JSON-LD missing or unparseable');
	}

	const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
	if (h1 !== 1) fail(`${h1} <h1> elements`);
}

if (problems.length) {
	console.error(problems.join('\n'));
	console.error(`\n✘ ${problems.length} problems across ${files.length} pages`);
	process.exit(1);
}
console.log(
	`✔ ${files.length} pages: unique titles and descriptions, canonical URLs, share images, JSON-LD, one h1 each`
);
