<script lang="ts">
	import { GraphDeps } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphDeps
			title="DEPS"
			deps={[
				{
					name: 'machines-ui',
					version: '0.9.0',
					accent: true,
					children: [
						{ name: 'svelte', version: '^5.0.0' },
						{ name: 'shiki', version: '^4.0.0' }
					]
				},
				{
					name: 'docs',
					version: '0.9.0',
					children: [
						{ name: 'mdsvex', version: '^0.12.0' },
						{ name: 'vite', version: '^5.0.0' }
					]
				}
			]}
		/>
	</Example>
</MachineDoc>
