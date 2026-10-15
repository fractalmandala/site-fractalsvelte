<script lang="ts">
	import { PropsTable, type PropItem } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const items: PropItem[] = [
		{ name: 'variant', type: "'primary' | 'secondary' | 'ghost'", optional: true, default: "'primary'", description: 'Visual style.' },
		{ name: 'size', type: "'sm' | 'md' | 'lg'", optional: true, default: "'md'", description: 'Height and padding.' },
		{ name: 'value', type: 'string', optional: true, bindable: true, description: 'Two-way bound with bind:value.' },
		{ name: 'label', type: 'string', description: 'Required: the accessible name.' },
		{ name: 'disabled', type: 'boolean', optional: true, default: 'false' }
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<PropsTable {items} title="Props" />
	</div>
</ComponentDoc>
