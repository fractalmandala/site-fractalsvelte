<script lang="ts">
	import { ButtonMachineOutline } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<ButtonMachineOutline>
			Button
		</ButtonMachineOutline>
	</Example>
	<Example>
		<ButtonMachineOutline href="/machines-ui/frame">
			Button
		</ButtonMachineOutline>
	</Example>
	<Example>
		<ButtonMachineOutline disabled>
			Button
		</ButtonMachineOutline>
	</Example>
</MachineDoc>
