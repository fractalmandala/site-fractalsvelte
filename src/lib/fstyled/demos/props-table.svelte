<script lang="ts">
	import { PropsTable } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<PropsTable
	class="wfull"
	items={[
		{
			name: 'variant',
			type: 'FsVariant',
			optional: true,
			default: "'primary'",
			description: 'Paint axis'
		},
		{ name: 'value', type: 'string', bindable: true, description: 'Bound value' },
		{ name: 'disabled', type: 'boolean', optional: true, default: 'false' }
	]}
/>
