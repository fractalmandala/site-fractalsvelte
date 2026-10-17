<script lang="ts">
	import { Checkbox } from '@fractaldesign/fractalsvelte-ui';

	let checkboxChecked = $state(true);
</script>

<div class="box gap-md">
	<Checkbox
		bind:checked={checkboxChecked}
		label="Enable real-time updates"
		description="Receive push notifications for critical changes"
	/>
	<Checkbox indeterminate label="Indeterminate tri-state checkbox" />
	<Checkbox disabled label="Disabled checkbox option" />
</div>
