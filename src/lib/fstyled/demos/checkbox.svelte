<script lang="ts">
	import { Checkbox } from '@fractaldesign/fractalsvelte-ui/styler';

	let agree = $state(true);
</script>

<div class="box gap-sm">
	<Checkbox
		label="I agree to the terms"
		description="You can revoke this at any time."
		bind:checked={agree}
	/>
	<Checkbox label="Indeterminate" indeterminate />
	<Checkbox label="Disabled" disabled />
	<Checkbox label="Required" error="Please accept to continue" />
</div>
