<script lang="ts">
	import { Radio } from '@fractaldesign/fractalsvelte-ui/styler';

	let channel = $state<string | number>('email');
</script>

<div class="box gap-sm">
	<Radio value="email" bind:group={channel} name="channel" label="Email" />
	<Radio
		value="sms"
		bind:group={channel}
		name="channel"
		label="SMS"
		description="Carrier rates apply"
	/>
	<Radio value="none" bind:group={channel} name="channel" label="Don't notify me" />
	<p class="text-body-sm text-secondary">Selected: {channel}</p>
</div>
