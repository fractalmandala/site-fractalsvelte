<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let {
		title,
		code,
		html,
		class: className = ''
	}: { title: string; code: string; html: string; class?: string } = $props();
</script>

<figure class="box border radius-sm bg-sunken minw0 {className}">
	<figcaption class="row ycenter xbetween gap-sm pl-md pr-xs py-xs bb text-sm text-muted">
		<span class="truncate">{title}</span>
		<CopyButton text={code} label="Copy code" />
	</figcaption>
	<pre class="pad-md scroll-x text-md lh16"><code>{@html html}</code></pre>
</figure>
