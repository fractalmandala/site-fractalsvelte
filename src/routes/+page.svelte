<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import InstallTabs from '#lib/components/InstallTabs.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import Wordmark from '#lib/components/Wordmark.svelte';
	import { GITHUB, installLines, packageCount, projects } from '#lib/site.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const suite = [
		{ value: String(projects.length), label: 'Projects' },
		{ value: String(packageCount), label: 'Packages' },
		{ value: '498', label: 'Styling classes' },
		{ value: '124', label: 'Components' }
	];
</script>

<main class="grow px-lg">
	<div class="content-section narrow-wide box gap-3xl">
		<section class="box xcenter gap-lg pt-3xl">
			<p class="fs-eyebrow text-body-sm weight-600 text-theme">
				{projects.length} projects · {packageCount} packages · one contract
			</p>
			<h1 class="weight-800 lh11">
				<Wordmark mark={['fractal', 'svelte']} class="hero-name hide-mobile" />
				<Wordmark mark={['fractal', 'svelte']} class="text-4xl ls-tight-xl hide-desktop" />
			</h1>
			<p class="prose text-body-lg text-secondary lh15">
				A styling system, two component libraries and a syntax highlighter for Svelte 5 and
				SvelteKit. Every package works on its own. None of them needs a framework underneath.
			</p>
			<div class="row xcenter gap-sm wrap">
				<a href="#packages" class="btn" data-variant="primary" data-shape="square"
					>Browse packages</a
				>
				<a href={GITHUB} class="btn" data-variant="outline" data-shape="square">GitHub</a>
			</div>
		</section>

		<Frame caption="The suite" hot class="pad-xl">
			<div class="row wrap xbetween gap-xl">
				{#each suite as stat (stat.label)}
					<div class="box gap-xs">
						<span class="page-title text-primary">{stat.value}</span>
						<span class="fs-eyebrow text-body-sm weight-600 text-muted">{stat.label}</span>
					</div>
				{/each}
			</div>
		</Frame>

		<section class="box gap-xl">
			<SectionHead id="packages" eyebrow="Every package" title="Take one. Take the stack.">
				All independently installable, all MIT, none requiring the others.
			</SectionHead>
			<div class="grid-2 fs-shelf">
				{#each projects as project (project.slug)}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>

		<section class="box gap-xl">
			<SectionHead eyebrow="Start anywhere" title="One install, then compose.">
				Pick your package manager once; every install block on the site follows it.
			</SectionHead>
			<div class="box gap-2xl">
				{#each projects as project, i (project.slug)}
					{@const starter = data.starters[i]}
					<div class="grid-2 gap-lg">
						<div class="box gap-sm">
							<a href="/{project.slug}" class="link-parent">
								<Wordmark mark={project.mark} class="link-title page-heading-xl" />
							</a>
							<p class="text-body text-secondary lh16">
								{project.kind}. {project.packages[0].role}.
							</p>
							<InstallTabs lines={installLines(project.packages[0])} />
						</div>
						<CodeBlock title={starter.title} code={starter.code} html={starter.html} />
					</div>
				{/each}
			</div>
		</section>

		<Frame caption="How this site is built" class="pad-xl">
			<div class="box gap-md">
				<p class="text-body-lg text-primary lh15">
					Every page here is composed from fractalstyler's class registry. No Tailwind, no
					component-scoped styles, no inline styles.
				</p>
				<p class="text-body text-secondary lh16">
					The site configures fractalstyler's tokens — fonts, this orange, light and dark palettes —
					and adds a handful of motif classes in its sanctioned extension layer: the dashed frame
					you are reading, its caption and corner marks, the hairline shelf and the section kicker.
					Code is highlighted at build time by fractalpop. The package READMEs are synced from npm,
					so the docs match what you install.
				</p>
			</div>
		</Frame>
	</div>
</main>
