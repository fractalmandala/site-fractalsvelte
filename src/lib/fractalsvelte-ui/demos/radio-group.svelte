<script lang="ts">
	import { RadioGroup } from '@fractaldesign/fractalsvelte-ui';

	let radioValue = $state('pro');
	const radioOptions = [
		{ label: 'Starter Tier', value: 'starter', description: 'Free forever for open source' },
		{ label: 'Pro Developer', value: 'pro', description: 'Advanced blocks and canvas features' },
		{
			label: 'Enterprise Core',
			value: 'enterprise',
			description: 'Custom SLA and design system audit'
		}
	];
</script>

<div class="fs-measure-md">
	<RadioGroup options={radioOptions} bind:value={radioValue} label="Choose Subscription Plan" />
</div>
