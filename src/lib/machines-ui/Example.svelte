<script lang="ts">
	// One live example: the markup between <Example> tags renders here, and the same
	// markup — read from the page's source on the server — prints underneath.
	import { getContext, type Snippet } from 'svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import { EXAMPLES, type ExampleContext } from './catalog.js';

	let { children }: { children: Snippet } = $props();

	const context = getContext<ExampleContext>(EXAMPLES);
	const index = context.next++;
	const sample = $derived(context.samples[index]);
</script>

<div class="box gap-md">
	<!-- machines-ui reads the site's own --border / --text-* tokens instead of its fallbacks -->
	<div
		class="row xcenter ycenter wrap gap-lg pad-xl border radius-sm bg-sunken relative minw0"
		data-graph-native-tokens
	>
		<div class="box gap-md wfull minw0">
			{@render children()}
		</div>
	</div>
	{#if sample}
		<CodeBlock title="Example {index + 1}" code={sample.code} html={sample.html} />
	{/if}
</div>
