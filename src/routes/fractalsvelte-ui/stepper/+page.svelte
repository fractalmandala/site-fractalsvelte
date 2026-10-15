<script lang="ts">
	import { Button, Stepper } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let currentStep = $state(1);
	const stepperSteps = [
		{ label: 'Tokens', description: 'Color & spacing' },
		{ label: 'Components', description: 'Runes architecture' },
		{ label: 'Quality gate', description: 'Checks and review' },
		{ label: 'Release', description: 'Production distribution' }
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg box gap-bs">
		<Stepper steps={stepperSteps} currentStep={currentStep} />
		<div class="row xcenter gap-sm">
			<Button size="xs" variant="outline" disabled={currentStep <= 0} onclick={() => currentStep--}>Previous</Button>
			<Button size="xs" variant="primary" disabled={currentStep >= stepperSteps.length - 1} onclick={() => currentStep++}>Next Step</Button>
		</div>
	</div>
</ComponentDoc>
