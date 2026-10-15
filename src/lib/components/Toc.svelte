<script lang="ts">
	type Entry = { depth: number; id: string; text: string };

	let { entries }: { entries: Entry[] } = $props();
</script>

<nav class="box gap-sm text-body-sm" aria-label="On this page">
	<p class="fs-eyebrow text-sm weight-600 text-muted">On this page</p>
	<ul class="box gap-xs">
		{#each entries as entry (entry.id)}
			<li class={entry.depth > 2 ? 'pl-md' : ''}>
				<a href="#{entry.id}" class="link-plain text-secondary">{entry.text}</a>
			</li>
		{/each}
	</ul>
</nav>
