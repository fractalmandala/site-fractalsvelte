// Pulls each package's published README, version and description from the npm
// registry into src/content/readme/ (as mdsvex pages) and
// src/lib/generated/registry.json, so the site documents exactly what
// `pnpm add` installs. Run with `pnpm docs:npm` (or `pnpm docs:sync` for all).
import { gunzipSync } from 'node:zlib';
import { toMdsvex, writeFile } from './lib/content.mjs';

const GH = 'https://github.com/fractalmandala';
/** npm name → where its README's relative links point */
const PACKAGES = {
	'@fractaldesign/fractalstyler': `${GH}/fractalstyler/blob/main/`,
	'@fractaldesign/fractalsvelte-ui': `${GH}/fractalsvelte-ui/blob/main/`,
	'@fractaldesign/machines-ui': `${GH}/machines-ui/blob/main/`,
	'@fractaldesign/pop': `${GH}/fractalpop/blob/main/packages/core/`,
	'@fractaldesign/pop-svelte': `${GH}/fractalpop/blob/main/packages/svelte/`,
	'@fractaldesign/pop-mdsvex': `${GH}/fractalpop/blob/main/packages/mdsvex/`,
	'@fractaldesign/pop-remark': `${GH}/fractalpop/blob/main/packages/remark/`
};

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
for (const [name, blobBase] of Object.entries(PACKAGES)) {
	const res = await fetch(`https://registry.npmjs.org/${name.replace('/', '%2f')}`);
	if (!res.ok) throw new Error(`${name}: registry responded ${res.status}`);
	const doc = await res.json();
	const version = doc['dist-tags'].latest;
	const manifest = doc.versions[version];
	const slug = name.split('/')[1];
	const readme = doc.readme || (await readmeFromTarball(manifest.dist.tarball));
	await writeFile(
		`src/content/readme/${slug}.md`,
		toMdsvex(trimSections(readme), {
			title: name,
			source: `${name}@${version} README, from npm`,
			blobBase
		})
	);
	registry[name] = {
		version,
		description: manifest.description ?? '',
		license: manifest.license ?? '',
		published: doc.time[version]
	};
	console.log(`${name}@${version}`);
}

await writeFile('src/lib/generated/registry.json', JSON.stringify(registry, null, '\t') + '\n');
