<script lang="ts">
	import { onMount } from 'svelte';
	import CopyButton from './CopyButton.svelte';
	import { preferences } from '#lib/preferences.svelte.js';
	import { installCommand, managers } from '#lib/site.js';

	let {
		lines,
		class: className = ''
	}: { lines: { names: string[]; dev: boolean }[]; class?: string } = $props();

	const commands = $derived(lines.map((l) => installCommand(preferences.manager, l.names, l.dev)));

	onMount(() => preferences.hydrate());
</script>

<figure class="box border radius-sm bg-sunken minw0 {className}">
	<figcaption class="row ycenter xbetween gap-sm pl-xs pr-xs py-xs bb">
		<div class="row ycenter gap-xs" role="group" aria-label="Package manager">
			{#each managers as manager (manager)}
				<button
					type="button"
					data-variant={preferences.manager === manager ? 'secondary' : 'ghost'}
					data-size="md"
					data-shape="modern"
					class={preferences.manager === manager ? 'text-primary' : 'text-muted'}
					aria-pressed={preferences.manager === manager}
					onclick={() => preferences.setManager(manager)}
				>
					{manager}
				</button>
			{/each}
		</div>
		<CopyButton text={commands.join('\n')} label="Copy install command" />
	</figcaption>
	<pre class="pad-md scroll-x text-md lh16"><code>{commands.join('\n')}</code></pre>
</figure>
