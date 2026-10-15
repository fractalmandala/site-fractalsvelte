<script lang="ts">
	import { page } from '$app/state';
	import { Icon } from 'fractalicons';
	import { luMenu, luX } from 'fractalicons/lucide';
	import { reGithubLine } from 'fractalicons/remix';
	import Logo from './Logo.svelte';
	import ModeToggle from './ModeToggle.svelte';
	import Wordmark from './Wordmark.svelte';
	import { GITHUB, projects } from '#lib/site.js';

	let menu = $state<HTMLDialogElement | null>(null);

	const isActive = (slug: string) =>
		page.url.pathname === `/${slug}` || page.url.pathname.startsWith(`/${slug}/`);

	function closeOnBackdrop(event: MouseEvent) {
		if (event.target === menu) menu?.close();
	}
</script>

<header class="app-header bg-surface bb row ycenter xbetween gap-lg">
	<Logo />

	<nav class="row ycenter gap-xs hide-mobile" aria-label="Packages">
		{#each projects as project (project.slug)}
			<a
				href="/{project.slug}"
				class="nav-link {isActive(project.slug) ? 'text-theme' : 'text-secondary link-plain'}"
				aria-current={isActive(project.slug) ? 'page' : undefined}
			>
				{project.slug}
			</a>
		{/each}
	</nav>

	<div class="row ycenter gap-xs">
		<a href={GITHUB} class="nav-link row ycenter text-secondary link-plain" aria-label="GitHub">
			<Icon icon={reGithubLine} size={18} />
		</a>
		<ModeToggle />
		<!-- iconbox sets display, so visibility lives on a wrapper -->
		<span class="hide-desktop">
			<button
				type="button"
				data-variant="iconbox"
				data-size="icon-lg"
				class="px-xs text-secondary"
				aria-label="Open menu"
				onclick={() => menu?.showModal()}
			>
				<Icon icon={luMenu} size={18} />
			</button>
		</span>
	</div>
</header>

<dialog
	bind:this={menu}
	onclick={closeOnBackdrop}
	class="wfull bg-surface text-primary border radius-sm shadow-lg pad-lg"
	aria-label="Site menu"
>
	<div class="box gap-md">
		<div class="row ycenter xbetween">
			<Logo />
			<button
				type="button"
				data-variant="iconbox"
				data-size="icon-lg"
				class="px-xs text-secondary"
				aria-label="Close menu"
				onclick={() => menu?.close()}
			>
				<Icon icon={luX} size={18} />
			</button>
		</div>
		<nav class="box gap-xs" aria-label="Packages">
			{#each projects as project (project.slug)}
				<a
					href="/{project.slug}"
					class="nav-link box gap-xs {isActive(project.slug) ? 'bg-sunken' : ''}"
					onclick={() => menu?.close()}
				>
					<Wordmark mark={project.mark} class="page-heading-bs" />
					<span class="text-body-sm text-muted">{project.kind}</span>
				</a>
			{/each}
		</nav>
	</div>
</dialog>
