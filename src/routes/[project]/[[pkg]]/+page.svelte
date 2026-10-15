<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luArrowRight } from 'fractalicons/lucide';
	import { reGithubLine, reNpmjsLine } from 'fractalicons/remix';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import DocsNav from '#lib/components/DocsNav.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import InstallTabs from '#lib/components/InstallTabs.svelte';
	import Toc from '#lib/components/Toc.svelte';
	import Wordmark from '#lib/components/Wordmark.svelte';
	import { installLines, packageHref } from '#lib/site.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const project = $derived(data.project);
	const pkg = $derived(data.pkg);
	const shortName = $derived(pkg.name.replace('@fractaldesign/', ''));
	/** Sub-packages split their wordmark at the last hyphen: pop- + svelte. */
	const subMark = $derived<[string, string]>([
		shortName.slice(0, shortName.lastIndexOf('-') + 1),
		shortName.slice(shortName.lastIndexOf('-') + 1)
	]);
	const published = $derived(
		new Date(pkg.published).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);

	const toc = $derived([
		{ depth: 2, id: 'setup', text: 'Install' },
		...(data.isMain
			? [
					{ depth: 2, id: 'usage', text: 'Quick start' },
					{ depth: 2, id: 'features', text: 'Features' }
				]
			: []),
		...(project.packages.length > 1 ? [{ depth: 2, id: 'family', text: 'Packages' }] : []),
		{ depth: 2, id: 'documentation', text: 'Documentation' },
		...data.readme.toc.map((e) => ({ ...e, depth: e.depth + 1 }))
	]);

	/** README code blocks are static HTML; one delegated listener gives them copy buttons. */
	async function copyFromReadme(event: MouseEvent) {
		const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-copy]');
		const code = button?.closest('figure')?.querySelector('pre');
		if (!button || !code) return;
		await navigator.clipboard.writeText(code.innerText);
		button.textContent = 'Copied';
		setTimeout(() => (button.textContent = 'Copy'), 1600);
	}
</script>

<svelte:head>
	<title>{data.isMain ? project.slug : shortName} — fractalsvelte</title>
	<meta name="description" content={pkg.description} />
</svelte:head>

<div class="app-main grow gap-2xl">
	<aside class="sidebar-left py-xl">
		<DocsNav />
	</aside>

	<main class="main-section py-xl">
		<div class="prose">
			<div class="box gap-3xl">
				<header class="box gap-md">
					<p class="fs-eyebrow text-sm weight-600 text-theme">{project.kind}</p>
					<h1 class="text-4xl weight-800 ls-tight-xl lh11">
						{#if data.isMain}
							<Wordmark mark={project.mark} />
						{:else}
							<Wordmark mark={subMark} />
						{/if}
					</h1>
					<p class="text-body-lg text-secondary lh15">
						{data.isMain ? project.summary : pkg.description}
					</p>
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
						<a
							href={project.repo}
							class="btn row gap-xs"
							data-variant="outline"
							data-shape="square"
						>
							<Icon icon={reGithubLine} size={16} /> GitHub
						</a>
					</div>
				</header>

				<section class="box gap-md">
					<h2 id="setup" class="page-heading-xl text-primary">Install</h2>
					<InstallTabs lines={installLines(pkg)} />
					<p class="text-body-sm text-muted lh15">
						<code class="bg-sunken radius-xs px-xs text-sm text-secondary">{pkg.name}</code> — {pkg.role}.
					</p>
				</section>

				{#if data.isMain}
					<section class="box gap-md">
						<h2 id="usage" class="page-heading-xl text-primary">Quick start</h2>
						{#each data.quickstart as snippet (snippet.title)}
							<CodeBlock title={snippet.title} code={snippet.code} html={snippet.html} />
						{/each}
					</section>

					<Frame caption="At a glance" hot class="pad-xl">
						<div class="row wrap xbetween gap-lg">
							{#each project.stats as stat (stat.label)}
								<div class="box gap-xs">
									<span class="text-2xl weight-800 ls-tight-xl lh11 text-primary">{stat.value}</span
									>
									<span class="fs-eyebrow text-sm weight-600 text-muted">{stat.label}</span>
								</div>
							{/each}
						</div>
					</Frame>

					<section class="box gap-md">
						<h2 id="features" class="page-heading-xl text-primary">Features</h2>
						<div class="grid-2 fs-shelf">
							{#each project.features as feature (feature.title)}
								<div class="box gap-xs pad-lg bg-surface">
									<h3 class="page-heading-bs text-primary">{feature.title}</h3>
									<p class="text-body-sm text-secondary lh16">{feature.body}</p>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				{#if project.packages.length > 1}
					<section class="box gap-md">
						<h2 id="family" class="page-heading-xl text-primary">Packages</h2>
						<div class="box fs-shelf">
							{#each project.packages as p (p.name)}
								{@const current = p === pkg || p.name === pkg.name}
								<a
									href={packageHref(project, p)}
									class="link-parent row ycenter xbetween gap-md pad-md bg-surface"
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
						<h2 id="documentation" class="page-heading-xl text-primary">Documentation</h2>
						<p class="text-body-sm text-muted">
							The README of {pkg.name}@{pkg.version}, as published to npm.
						</p>
					</header>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div class="box gap-md" role="presentation" onclick={copyFromReadme}>
						{@html data.readme.html}
					</div>
				</section>
			</div>
		</div>
	</main>

	<aside class="sidebar-right py-xl">
		<Toc entries={toc} />
	</aside>
</div>
