<script lang="ts">
	import { GraphTypewriter } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphTypewriter
			title="BOOT"
			speedMs={45}
			lines={['> boot machines-ui', '> mounting frames... ok', '> ready']}
		/>
	</Example>
</MachineDoc>
