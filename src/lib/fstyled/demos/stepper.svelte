<script lang="ts">
	import { Stepper, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let step = $state(1);
</script>

<div class="box gap-xl wfull">
	<Stepper
		bind:currentStep={step}
		clickable
		steps={[
			{ label: 'Account', description: 'Email & password' },
			{ label: 'Workspace' },
			{ label: 'Invite' },
			{ label: 'Done' }
		]}
	/>
	<div class="row ycenter xcenter gap-sm">
		<Button variant="secondary" disabled={step === 0} onclick={() => (step -= 1)}>Back</Button>
		<Button disabled={step === 3} onclick={() => (step += 1)}>Next</Button>
	</div>
	<Stepper
		orientation="vertical"
		currentStep={2}
		steps={[
			{ label: 'Queued' },
			{ label: 'Building' },
			{ label: 'Failed', error: true, description: 'Exit code 1' }
		]}
	/>
</div>
