// Pulls each package's published README, version and description from the npm
// registry into src/content/ and src/lib/generated/registry.json, so the site
// documents exactly what `pnpm add` installs. Run with `pnpm docs:sync`.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGES = [
	'@fractaldesign/fractalstyler',
	'@fractaldesign/fractalsvelte-ui',
	'@fractaldesign/machines-ui',
	'@fractaldesign/pop',
	'@fractaldesign/pop-svelte',
	'@fractaldesign/pop-mdsvex',
	'@fractaldesign/pop-remark'
];

// Maintainer-only sections that ship in some READMEs but aren't user docs.
const DROP_SECTION = /^(before release|developing this package|.*changelog)$/i;

function trimSections(md) {
	const out = [];
	let dropLevel = 0;
	let inFence = false;
	for (const line of md.split('\n')) {
		if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
		const heading = !inFence && /^(#{1,6})\s+(.*)$/.exec(line);
		if (heading) {
			const level = heading[1].length;
			if (dropLevel && level <= dropLevel) dropLevel = 0;
			if (!dropLevel && DROP_SECTION.test(heading[2].trim())) dropLevel = level;
		}
		if (!dropLevel) out.push(line);
	}
	return out.join('\n').trim() + '\n';
}

// Some publishes leave the registry's readme field empty; the tarball always
// carries the file, so read package/README.md straight out of it.
async function readmeFromTarball(url) {
	const tar = gunzipSync(Buffer.from(await (await fetch(url)).arrayBuffer()));
	for (let at = 0; at + 512 <= tar.length;) {
		const name = tar.toString('utf8', at, at + 100).replace(/\0.*$/s, '');
		if (!name) break;
		const size = parseInt(tar.toString('utf8', at + 124, at + 136).trim() || '0', 8);
		if (/^[^/]+\/readme\.md$/i.test(name)) return tar.toString('utf8', at + 512, at + 512 + size);
		at += 512 + Math.ceil(size / 512) * 512;
	}
	return '';
}

const registry = {};
for (const name of PACKAGES) {
	const res = await fetch(`https://registry.npmjs.org/${name.replace('/', '%2f')}`);
	if (!res.ok) throw new Error(`${name}: registry responded ${res.status}`);
	const doc = await res.json();
	const version = doc['dist-tags'].latest;
	const manifest = doc.versions[version];
	const slug = name.split('/')[1];
	const readme = doc.readme || (await readmeFromTarball(manifest.dist.tarball));
	await fs.writeFile(path.join(ROOT, 'src/content', `${slug}.md`), trimSections(readme));
	registry[name] = {
		version,
		description: manifest.description ?? '',
		license: manifest.license ?? '',
		published: doc.time[version]
	};
	console.log(`${name}@${version}`);
}

await fs.writeFile(
	path.join(ROOT, 'src/lib/generated/registry.json'),
	JSON.stringify(registry, null, '\t') + '\n'
);
