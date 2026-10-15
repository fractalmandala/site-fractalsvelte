<script lang="ts">
	import { AsciiDiagram } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
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
</MachineDoc>
