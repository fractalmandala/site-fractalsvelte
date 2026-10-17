<script lang="ts">
	import { PropsTable, type PropItem } from '@fractaldesign/fractalsvelte-ui';

	const items: PropItem[] = [
		{
			name: 'variant',
			type: "'primary' | 'secondary' | 'ghost'",
			optional: true,
			default: "'primary'",
			description: 'Visual style.'
		},
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			optional: true,
			default: "'md'",
			description: 'Height and padding.'
		},
		{
			name: 'value',
			type: 'string',
			optional: true,
			bindable: true,
			description: 'Two-way bound with bind:value.'
		},
		{ name: 'label', type: 'string', description: 'Required: the accessible name.' },
		{ name: 'disabled', type: 'boolean', optional: true, default: 'false' }
	];
</script>

<div class="fs-measure-lg">
	<PropsTable {items} title="Props" />
</div>
