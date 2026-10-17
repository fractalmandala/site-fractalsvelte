<script lang="ts">
	import { page } from '$app/state';
	import { Icon } from 'fractalicons';
	import { luMenu, luX } from 'fractalicons/lucide';
	import { reGithubLine } from 'fractalicons/remix';
	import Logo from './Logo.svelte';
	import ModeToggle from '#lib/mode/ModeToggle.svelte';
	import { mode } from '#lib/mode/mode.svelte.js';
	import { GITHUB, projects } from '#lib/site.js';

	let menu = $state<HTMLDialogElement | null>(null);
	const store = mode();
	const dark = $derived(store.resolved === 'dark');

	const isActive = (slug: string) =>
		page.url.pathname === `/${slug}` || page.url.pathname.startsWith(`/${slug}/`);

	function closeOnBackdrop(event: MouseEvent) {
		if (event.target === menu) menu?.close();
	}
</script>

<header class="app-header bg-surface row ycenter xbetween gap-lg">
	<a class="logo-link" href="/">
		{#if dark}
		<img class="logotype" src="/images/logotype-dark.png" alt="logo"/>
		{:else}
		<img class="logotype" src="/images/logotype-light.png" alt="logo"/>
		{/if}
	</a>
	<nav class="header-nav row ycenter gap-bs hide-mobile" aria-label="Packages">
		{#each projects as project (project.slug)}
			<a
				href="/{project.slug}"
				class="{isActive(project.slug) ? 'text-theme' : 'text-primary link-plain'}"
				aria-current={isActive(project.slug) ? 'page' : undefined}
			>
				{project.name}
			</a>
		{/each}
		<a href={GITHUB} target="_blank" rel="noreferrer" class="iconbox" aria-label="GitHub">
			<Icon icon={reGithubLine} size={16} />
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
	</nav>
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
					{project.name}
				</a>
			{/each}
		</nav>
	</div>
</dialog>
