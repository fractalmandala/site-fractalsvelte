<script lang="ts">
	import { TreeList } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const treeItems = [
		{
			id: '1',
			label: 'src',
			children: [
				{
					id: '2',
					label: 'lib',
					children: [
						{ id: '3', label: 'components' },
						{ id: '4', label: 'tokens.css' }
					]
				},
				{ id: '5', label: 'routes' }
			]
		}
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm pad-md bg-surface border radius-sm">
		<TreeList items={treeItems} />
	</div>
</ComponentDoc>
