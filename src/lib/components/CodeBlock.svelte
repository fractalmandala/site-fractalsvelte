<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let {
		title,
		code,
		html,
		class: className = ''
	}: { title: string; code: string; html: string; class?: string } = $props();
</script>

<figure class="box border radius-sm bg-raised minw0 {className}">
	<figcaption class="row ycenter xbetween gap-sm px-sm bb text-sm text-primary bg-panel">
		<span class="truncate">{title}</span>
		<CopyButton text={code} label="Copy code" />
	</figcaption>
	<pre class="pad-md scroll-x text-md lh16"><code>{@html html}</code></pre>
</figure>
