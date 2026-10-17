// Scaffolds the six route files a doc set needs, so adding a library is a registry
// entry + `node scripts/scaffold-docset.ts <id>` + the package's stylesheet import in
// the generated +layout.svelte. Safe to re-run: existing files are left alone.
import fs from 'node:fs';
import path from 'node:path';

const id = process.argv[2];
if (!id) {
	console.error('usage: node scripts/scaffold-docset.ts <set-id>');
	process.exit(1);
}

const dir = path.join('src/routes', id);

const files: Record<string, string> = {
	'+layout.server.ts': `import { setLayoutLoad } from '#lib/server/docs/load.js';

export const load = setLayoutLoad('${id}');
`,
	'+layout.svelte': `<script lang="ts">
	import LibraryShell from '#lib/docs/LibraryShell.svelte';
	// import the package's stylesheet here, once, when it needs one
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<LibraryShell {data}>{@render children()}</LibraryShell>
`,
	'+page.server.ts': `import { setIndexLoad } from '#lib/server/docs/load.js';

export const load = setIndexLoad('${id}');
`,
	'+page.svelte': `<script lang="ts">
	import LibraryIndex from '#lib/docs/LibraryIndex.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<LibraryIndex {data} />
`,
	'[name]/+page.server.ts': `import { componentEntries, componentLoad } from '#lib/server/docs/load.js';

export const load = componentLoad('${id}');
export const entries = componentEntries('${id}');
`,
	'[name]/+page.svelte': `<script lang="ts">
	import DemoHost from '#lib/docs/DemoHost.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<DemoHost {data} />
`
};

for (const [rel, content] of Object.entries(files)) {
	const file = path.join(dir, rel);
	if (fs.existsSync(file)) {
		console.log(`skip  ${file}`);
		continue;
	}
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, content);
	console.log(`write ${file}`);
}
