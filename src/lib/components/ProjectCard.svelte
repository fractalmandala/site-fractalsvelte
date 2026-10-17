<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luArrowRight } from 'fractalicons/lucide';
	import type { Project } from '#lib/site.js';

	let { project }: { project: Project } = $props();

</script>

<a href="/{project.slug}" class="card box" data-variant="ghost">
	<p class="card-title">{project.name}</p>
	<p class="card-desc">{project.description}</p>
	<footer class="card-footer">
		<Icon icon={luArrowRight} size={18} />
	</footer>
</a>
