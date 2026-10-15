<script lang="ts">
	import { page } from '$app/state';
	import { packageHref, projects } from '#lib/site.js';
</script>

<nav class="box gap-lg text-body-sm" aria-label="Documentation">
	{#each projects as project (project.slug)}
		<div class="box gap-xs">
			<p class="fs-eyebrow text-sm weight-600 text-muted">{project.kind}</p>
			<ul class="box">
				{#each project.packages as p (p.name)}
					{@const href = packageHref(project, p)}
					{@const active = page.url.pathname === href}
					<li>
						<a
							{href}
							class="row ycenter py-xs pl-sm {active
								? 'bl-str text-theme weight-600'
								: 'bl-sub text-secondary link-plain'}"
							aria-current={active ? 'page' : undefined}
						>
							<span class="truncate">{p.name.replace('@fractaldesign/', '')}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
