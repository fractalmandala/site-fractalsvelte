<script lang="ts">
	import { ShuffleText } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<ShuffleText
			text="MACHINES UI"
			shuffleDirection="right"
			duration={0.4}
			stagger={0.03}
			tag="h2"
			textAlign="center"
		/>
	</Example>
</MachineDoc>
