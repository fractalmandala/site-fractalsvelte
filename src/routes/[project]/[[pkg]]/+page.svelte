<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luArrowRight } from 'fractalicons/lucide';
	import { reGithubLine, reNpmjsLine } from 'fractalicons/remix';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import DocsShell from '#lib/components/DocsShell.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import InstallTabs from '#lib/components/InstallTabs.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import { guides, installLines, packageHref } from '#lib/site.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const project = $derived(data.project);
	const pkg = $derived(data.pkg);
	const shortName = $derived(pkg.name.replace('@fractaldesign/', ''));
	/** Sub-packages split their wordmark at the last hyphen: pop- + svelte. */
	const mark = $derived<[string, string]>(
		data.isMain
			? project.mark
			: [
					shortName.slice(0, shortName.lastIndexOf('-') + 1),
					shortName.slice(shortName.lastIndexOf('-') + 1)
				]
	);
	const published = $derived(
		new Date(pkg.published).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);

	/** Guides and the component reference, as cards on the overview. */
	const docLinks = $derived(
		data.isMain
			? [
					...(guides[project.slug] ?? []).map((g) => ({
						href: `/${project.slug}/docs/${g.slug}`,
						title: g.title,
						description: g.description
					})),
					...(project.components
						? [
								{
									href: `/${project.slug}/components`,
									title: 'Components',
									description: `API reference for all ${data.componentCount} components: props, snippets, examples.`
								}
							]
						: [])
				]
			: []
	);

	const Readme = $derived(data.readme.component);

	const toc = $derived([
		{ depth: 2, id: 'pkg-install', text: 'Install' },
		...(data.isMain
			? [
					{ depth: 2, id: 'pkg-quick-start', text: 'Quick start' },
					{ depth: 2, id: 'pkg-features', text: 'Features' }
				]
			: []),
		...(docLinks.length ? [{ depth: 2, id: 'pkg-guides', text: 'Guides' }] : []),
		...(project.packages.length > 1 ? [{ depth: 2, id: 'pkg-packages', text: 'Packages' }] : []),
		{ depth: 2, id: 'pkg-readme', text: 'README' },
		...data.readme.meta.toc.map((e) => ({ ...e, depth: e.depth + 1 }))
	]);
</script>

<svelte:head>
	<title>{data.isMain ? project.slug : shortName} — fractalsvelte</title>
	<meta name="description" content={pkg.description} />
</svelte:head>

<DocsShell {toc}>
	<PageHeader eyebrow={project.kind} {mark} lede={data.isMain ? project.summary : pkg.description}>
		<div class="row ycenter gap-xs wrap">
			<span class="chip bg-sunken text-primary">v{pkg.version}</span>
			<span class="chip bg-sunken text-secondary">{pkg.license}</span>
			<span class="chip bg-sunken text-secondary">Published {published}</span>
		</div>
		<div class="row ycenter gap-sm wrap">
			<a
				href="https://www.npmjs.com/package/{pkg.name}"
				class="btn row gap-xs"
				data-variant="outline"
				data-shape="square"
			>
				<Icon icon={reNpmjsLine} size={16} /> npm
			</a>
			<a href={project.repo} class="btn row gap-xs" data-variant="outline" data-shape="square">
				<Icon icon={reGithubLine} size={16} /> GitHub
			</a>
		</div>
	</PageHeader>

	<section class="box gap-md">
		<h2 id="pkg-install" class="page-heading-xl text-primary">Install</h2>
		<InstallTabs lines={installLines(pkg)} />
		<p class="text-body-sm text-muted lh15">
			<code class="bg-sunken radius-xs px-xs text-sm text-secondary">{pkg.name}</code> — {pkg.role}.
		</p>
	</section>

	{#if data.isMain}
		<section class="box gap-md">
			<h2 id="pkg-quick-start" class="page-heading-xl text-primary">Quick start</h2>
			{#each data.quickstart as snippet (snippet.title)}
				<CodeBlock title={snippet.title} code={snippet.code} html={snippet.html} />
			{/each}
		</section>

		<Frame caption="At a glance" hot class="pad-xl">
			<div class="row wrap xbetween gap-lg">
				{#each project.stats as stat (stat.label)}
					<div class="box gap-xs">
						<span class="text-2xl weight-800 ls-tight-xl lh11 text-primary">{stat.value}</span>
						<span class="fs-eyebrow text-sm weight-600 text-muted">{stat.label}</span>
					</div>
				{/each}
			</div>
		</Frame>

		<section class="box gap-md">
			<h2 id="pkg-features" class="page-heading-xl text-primary">Features</h2>
			<div class="grid-2 fs-shelf">
				{#each project.features as feature (feature.title)}
					<div class="box gap-xs pad-lg bg-surface fs-shelf-cell">
						<h3 class="page-heading-bs text-primary">{feature.title}</h3>
						<p class="text-body-sm text-secondary lh16">{feature.body}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if docLinks.length}
		<section class="box gap-md">
			<h2 id="pkg-guides" class="page-heading-xl text-primary">Guides</h2>
			<div class="grid-2 fs-shelf">
				{#each docLinks as link (link.href)}
					<a href={link.href} class="link-parent box gap-xs pad-lg bg-surface fs-shelf-cell">
						<span class="row ycenter xbetween gap-sm">
							<span class="link-title page-heading-bs">{link.title}</span>
							<span class="text-muted"><Icon icon={luArrowRight} size={16} /></span>
						</span>
						<span class="text-body-sm text-secondary lh16">{link.description}</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if project.packages.length > 1}
		<section class="box gap-md">
			<h2 id="pkg-packages" class="page-heading-xl text-primary">Packages</h2>
			<div class="box fs-shelf">
				{#each project.packages as p (p.name)}
					{@const current = p.name === pkg.name}
					<a
						href={packageHref(project, p)}
						class="link-parent row ycenter xbetween gap-md pad-md bg-surface fs-shelf-cell"
						aria-current={current ? 'page' : undefined}
					>
						<span class="box gap-xs minw0">
							<span class="link-title text-bs weight-700 {current ? 'text-theme' : ''}"
								>{p.name}</span
							>
							<span class="text-body-sm text-secondary">{p.role}</span>
						</span>
						<span class="row ycenter gap-sm shrink-0 text-muted">
							<span class="text-body-sm">v{p.version}</span>
							<Icon icon={luArrowRight} size={16} />
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<section class="box gap-md">
		<header class="box gap-xs bb pb-md">
			<h2 id="pkg-readme" class="page-heading-xl text-primary">README</h2>
			<p class="text-body-sm text-muted">{data.readme.meta.source}.</p>
		</header>
		<Readme />
	</section>
</DocsShell>
