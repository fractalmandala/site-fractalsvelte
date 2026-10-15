<script lang="ts">
	import { page } from '$app/state';

	type Group = { id: string; label: string; links: { name: string; slug: string }[] };

	let { title, base, groups }: { title: string; base: string; groups: Group[] } = $props();

	let nav = $state<HTMLElement>();

	// keep the current page's link in view as you move through a long list
	$effect(() => {
		void page.url.pathname;
		nav?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
	});

	const linkClass = (active: boolean, nested: boolean) =>
		`row ycenter py-xs ${nested ? 'pl-lg' : 'pl-sm'} ${
			active ? 'nav-link text-theme' : 'nav-link text-primary'
		}`;
</script>

<nav bind:this={nav} class="box gap-lg" aria-label="{title} components">
	{#each groups as group (group.id)}
		<div class="nav-section">
			<p class="nav-header tt-u text-muted">{group.label}</p>
			<div class="box">
								{#each group.links as link (link.slug)}
					{@const href = `${base}/${link.slug}`}
					{@const active = page.url.pathname === href}
						<a {href} class={linkClass(active, true)} aria-current={active ? 'page' : undefined}>
							<span class="truncate">{link.name}</span>
						</a>
				{/each}
			</div>
		</div>
	{/each}
</nav>
