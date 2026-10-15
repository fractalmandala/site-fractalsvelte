<script lang="ts">
	type Entry = { depth: number; id: string; text: string };

	let { entries }: { entries: Entry[] } = $props();
</script>

<nav class="box gap-sm" aria-label="On this page">
	<p class="nav-header text-muted tt-u">On this page</p>
	<div class="box gap-sm">
		{#each entries as entry (entry.id)}
			<div class={entry.depth > 1 ? 'pl-md' : ''}>
				<a href="#{entry.id}" class="text-sm link-plain text-secondary">{entry.text}</a>
			</div>
		{/each}
		</div>
</nav>
