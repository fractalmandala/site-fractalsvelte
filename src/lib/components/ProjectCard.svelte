<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luArrowRight } from 'fractalicons/lucide';
	import Wordmark from './Wordmark.svelte';
	import type { Project } from '#lib/site.js';

	let { project }: { project: Project } = $props();

	const main = $derived(project.packages[0]);
</script>

<a href="/{project.slug}" class="link-parent box gap-md pad-xl bg-surface hfull">
	<div class="box gap-xs">
		<span class="row ycenter xbetween gap-sm">
			<Wordmark mark={project.mark} class="link-title text-xl weight-800 ls-tight-lg" />
			<span class="text-muted"><Icon icon={luArrowRight} size={18} /></span>
		</span>
		<span class="text-body-sm text-muted">v{main.version} · {project.kind}</span>
	</div>
	<p class="text-body text-secondary lh16 grow">{project.summary}</p>
	<div class="row gap-xs wrap">
		{#each project.packages as p (p.name)}
			<span class="chip bg-sunken text-secondary">{p.name.replace('@fractaldesign/', '')}</span>
		{/each}
	</div>
</a>
