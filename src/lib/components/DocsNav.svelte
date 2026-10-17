<script lang="ts">
	import { page } from '$app/state';
	import { guides, projects } from '#lib/site.js';

	const sections = projects.map((project) => ({
		project,
		links: [
			...(guides[project.slug] ?? []).map((g) => ({
				href: `/${project.slug}/docs/${g.slug}`,
				label: g.title,
				nested: true
			}))
		]
	}));

	const isActive = (href: string) =>
		page.url.pathname === href ||
		(href.endsWith('/components') && page.url.pathname.startsWith(`${href}/`));
</script>

<nav class="box gap-lg text-body-sm" aria-label="Documentation">
	{#each sections as { project, links } (project.slug)}
		<div class="box gap-xs">
			<p class="fs-eyebrow text-body-sm weight-600 text-muted">{project.name}</p>
			<ul class="box">
				{#each links as link (link.href)}
					{@const active = isActive(link.href)}
					<li>
						<a
							href={link.href}
							class="row ycenter py-xs {link.nested ? 'pl-lg' : 'pl-sm'} {active
								? 'bl-str text-theme weight-600'
								: 'bl-sub text-secondary link-plain'}"
							aria-current={active ? 'page' : undefined}
						>
							<span class="truncate">{link.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
