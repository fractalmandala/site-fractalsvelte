<script lang="ts">
	import { TreeList } from '@fractaldesign/fractalsvelte-ui/styler';

	let expandedIds = $state<string[]>(['src']);
	let selectedId = $state('index');
</script>

<div class="box gap-sm wfull">
	<TreeList
		bind:expandedIds
		bind:selectedId
		items={[
			{
				id: 'src',
				label: 'src',
				children: [
					{ id: 'lib', label: 'lib', children: [{ id: 'button', label: 'Button.svelte' }] },
					{ id: 'index', label: 'index.ts' }
				]
			},
			{ id: 'pkg', label: 'package.json' }
		]}
	/>
	<p class="text-body-sm text-secondary">Selected: {selectedId}</p>
</div>
