<script lang="ts">
	import { RadioGroup } from '@fractaldesign/fractalsvelte-ui/styler';

	let plan = $state<string | number | undefined>('pro');
	let density = $state<string | number | undefined>('cozy');
</script>

<div class="grid-2 gap-lg wfull">
	<RadioGroup
		label="Plan"
		bind:value={plan}
		options={[
			{ value: 'free', label: 'Free', description: 'For side projects' },
			{ value: 'pro', label: 'Pro', description: 'For teams' },
			{ value: 'ent', label: 'Enterprise', disabled: true }
		]}
	/>
	<RadioGroup
		label="Density"
		orientation="horizontal"
		bind:value={density}
		options={[
			{ value: 'compact', label: 'Compact' },
			{ value: 'cozy', label: 'Cozy' }
		]}
		helperText="Arrow keys move between options."
	/>
</div>
