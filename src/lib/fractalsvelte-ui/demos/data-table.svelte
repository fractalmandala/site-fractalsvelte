<script lang="ts">
	import { type DataColumn, DataTable } from '@fractaldesign/fractalsvelte-ui';

	const sampleTableRows = [
		{ id: '1', name: 'Button', category: 'Actions', status: 'Stable', runes: 'Yes', rating: 4.9 },
		{
			id: '2',
			name: 'BentoGrid',
			category: 'Layout',
			status: 'Enhanced',
			runes: 'Yes',
			rating: 5.0
		},
		{
			id: '3',
			name: 'CommandPalette',
			category: 'Overlays',
			status: 'Active',
			runes: 'Yes',
			rating: 4.8
		},
		{
			id: '4',
			name: 'MagneticButton',
			category: 'Motion',
			status: 'New',
			runes: 'Yes',
			rating: 4.9
		},
		{ id: '5', name: 'ToastStack', category: 'Overlays', status: 'New', runes: 'Yes', rating: 5.0 }
	];
	const sampleTableCols: DataColumn[] = [
		{ key: 'name', label: 'Component', sortable: true },
		{ key: 'category', label: 'Category', sortable: true },
		{ key: 'status', label: 'Status', sortable: true },
		{ key: 'runes', label: 'Runes Ready' },
		{ key: 'rating', label: 'Rating', sortable: true, align: 'right' }
	];
</script>

<div class="fs-measure-lg">
	<DataTable columns={sampleTableCols} rows={sampleTableRows} />
</div>
