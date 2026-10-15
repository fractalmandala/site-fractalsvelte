<script lang="ts">
	import { GITHUB, projects } from '#lib/site.js';
</script>

<footer class="bt px-lg py-xl">
	<div class="row ycenter xbetween gap-lg wrap">
		<div class="box gap-xs">
			<span class="text-sm weight-700 tt-u fs-eyebrow text-primary">fractalsvelte</span>
			<span class="text-body-sm text-muted"
				>MIT licensed. Built with fractalstyler and nothing else.</span
			>
		</div>
		<nav class="row ycenter gap-md wrap text-body-sm" aria-label="Footer">
			{#each projects as project (project.slug)}
				<a href="/{project.slug}" class="link-plain text-secondary">{project.slug}</a>
			{/each}
			<a href={GITHUB} class="link-plain text-secondary">GitHub</a>
		</nav>
	</div>
</footer>
