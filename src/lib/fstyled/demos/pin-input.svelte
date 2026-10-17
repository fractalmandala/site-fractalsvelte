<script lang="ts">
	import { PinInput } from '@fractaldesign/fractalsvelte-ui/styler';

	let pin = $state('4920');
</script>

<div class="box gap-lg">
	<PinInput label="Verification code" bind:value={pin} helperText="Paste works too." />
	<PinInput label="Passphrase" type="text" length={4} mask size="bs" />
	<PinInput label="Invalid" value="12" length={4} error="Code expired" />
</div>
