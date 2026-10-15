<script lang="ts">
	import { ButtonMachine } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<ButtonMachine>
			Button
		</ButtonMachine>
	</Example>
	<Example>
		<ButtonMachine href="/machines-ui">
			Button
		</ButtonMachine>
	</Example>
	<Example>
		<ButtonMachine disabled>
			Button
		</ButtonMachine>
	</Example>
</MachineDoc>
