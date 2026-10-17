<script lang="ts">
	import Frame from '#lib/components/Frame.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { GITHUB, projects } from '#lib/site.js';
	import { Icon } from 'fractalicons';
	import Heart from '#lib/icons/heart.svelte';
	import type { PageProps } from './$types';
	import { luArrowRight } from 'fractalicons/lucide';
	import { mode } from '#lib/mode/mode.svelte.js';

	let { data }: PageProps = $props();
	const store = mode();
	const dark = $derived(store.resolved === 'dark');
</script>

<section class="main-section">
	<section class="content-section narrow-wide">
		<section class="box xcenter gap-2xl hfull-vh-fitted ycenter pb-3xl">
			<span class="mono text-muted text-sm"
				><span class="text-theme">[</span> components | themes | styling system | curated links
				<span class="text-theme">]</span></span
			>
			{#if dark}
				<img class="landinglogo" src="/images/logotype-dark.png" alt="logo" />
			{:else}
				<img class="landinglogo" src="/images/logotype-light.png" alt="logo" />
			{/if}
			<p class="text-xl text-secondary lh16 prose">
				Massive components library; motion and layout blocks; graph and workflow frames and moving
				parts; lightweight code highlighting with dedicated components; themes and theme manager; UI
				styling solutions; custom styling system. No Tailwind needed. All Sveltekit.
			</p>
			<div class="row weight-600">
				Made with <Heart /> for Sveltelit.
			</div>
			<div class="row xcenter gap-sm wrap">
				<a
					href="/fractalsvelte-ui"
					class="btn tt-u weight-500"
					data-variant="primary"
					data-shape="square">Components</a
				>
				<a
					href="/machines-ui"
					class="btn tt-u weight-500"
					data-variant="outline"
					data-shape="square">MACHINES UI</a
				>
			</div>
		</section>

		<section class="box gap-xl">
			<div class="box">
				<h2 class="text-3xl ls-tight-xl">The Svelte Collection</h2>
				<p class="text-body text-secondary">Open Source | Tailwind Free | Dependency Light</p>
			</div>
			<div class="grid-2 fs-shelf">
				{#each projects as project}
					<a href="/{project.slug}" class="card box gap-sm pad-xl" data-variant="ghost">
						<p class="text-xl weight-600">{project.name}</p>
						<p class="text-bs lh15 text-secondary">{project.description}</p>
						<footer class="card-footer text-theme">
							<Icon icon={luArrowRight} size={24} />
						</footer>
					</a>
				{/each}
			</div>
		</section>

	</section>
</section>
