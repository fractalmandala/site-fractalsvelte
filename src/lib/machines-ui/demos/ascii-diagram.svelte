<script lang="ts">
	import { AsciiDiagram } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<AsciiDiagram
		title="Signal path"
		content={`+ - - - - - - [ SIGNAL PATH ] - - - - - - +
		|                                         |
		|   source ──> filter ──> gain ──> out    |
		|                    ^                    |
		|                    └─── feedback        |
		|                                         |
		+ - - - - - - - - - - - - - - - - - - - - +`}
	/>
</Example>
