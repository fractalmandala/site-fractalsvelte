<script module lang="ts">
	// Every markdown element mdsvex emits is swapped for one of these, so rendered
	// docs are composed from fractalstyler classes like the rest of the site.
	export { default as h2 } from './elements/H2.svelte';
	export { default as h3 } from './elements/H3.svelte';
	export { default as h4 } from './elements/H4.svelte';
	export { default as p } from './elements/P.svelte';
	export { default as a } from './elements/A.svelte';
	export { default as strong } from './elements/Strong.svelte';
	export { default as code } from './elements/Code.svelte';
	export { default as ul } from './elements/Ul.svelte';
	export { default as ol } from './elements/Ol.svelte';
	export { default as li } from './elements/Li.svelte';
	export { default as blockquote } from './elements/Blockquote.svelte';
	export { default as hr } from './elements/Hr.svelte';
	export { default as table } from './elements/Table.svelte';
	export { default as th } from './elements/Th.svelte';
	export { default as td } from './elements/Td.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();

	/** Code frames are static markup from the highlighter; one listener gives them all a working Copy. */
	async function copy(event: MouseEvent) {
		const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-copy]');
		const code = button?.closest('figure')?.querySelector('pre');
		if (!button || !code) return;
		await navigator.clipboard.writeText(code.innerText);
		button.textContent = 'Copied';
		setTimeout(() => (button.textContent = 'Copy'), 1600);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="box gap-md" role="presentation" onclick={copy}>
	{@render children?.()}
</div>
