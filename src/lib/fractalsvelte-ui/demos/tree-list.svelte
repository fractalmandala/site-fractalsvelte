<script lang="ts">
	import { TreeList } from '@fractaldesign/fractalsvelte-ui';

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

<div class="fs-measure-sm pad-md bg-surface border radius-sm">
	<TreeList items={treeItems} />
</div>
