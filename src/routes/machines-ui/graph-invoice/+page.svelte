<script lang="ts">
	import { GraphInvoice } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphInvoice
			title="INVOICE 0041"
			from={{ name: 'machines-ui', lines: ['hello@example.com'] }}
			to={{ name: 'Acme Studio', lines: ['14 Market Street', 'San Francisco, CA'] }}
			meta={[
				{ label: 'No.', value: '0041' },
				{ label: 'Issued', value: 'Mar 12, 2026' },
				{ label: 'Due', value: 'Apr 11, 2026' }
			]}
			items={[
				{ description: 'Design system', qty: '1', rate: '4,200', amount: '4,200' },
				{ description: 'Motion pass', qty: '1', rate: '1,800', amount: '1,800' },
				{ description: 'Docs rewrite', qty: '8h', rate: '180', amount: '1,440' }
			]}
			totals={[
				{ label: 'Subtotal', value: '7,440' },
				{ label: 'Tax', value: '0' },
				{ label: 'Amount due', value: '7,440', accent: true }
			]}
			note="Net 30. Wire to the account on file."
		/>
	</Example>
</MachineDoc>
