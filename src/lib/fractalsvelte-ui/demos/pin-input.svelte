<script lang="ts">
	import { PinInput } from '@fractaldesign/fractalsvelte-ui';

	let pinValue = $state('8492');
</script>

<div class="box xcenter gap-md">
	<PinInput length={4} bind:value={pinValue} />
	<span class="text-body-sm text-muted">Entered Code: <code>{pinValue}</code></span>
</div>
