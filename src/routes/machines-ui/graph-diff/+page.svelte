<script lang="ts">
	import { GraphDiff } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphDiff
			title="BUNDLE"
			palette="duo"
			rows={[
				{ label: 'vendor', value: '84 kb' },
				{ label: 'app', value: '31 kb', sign: 'add' },
				{ label: 'sourcemaps', value: '12 kb', sign: 'remove' }
			]}
			footer={{ label: 'shipped', value: '103 kb' }}
		/>
	</Example>
</MachineDoc>
