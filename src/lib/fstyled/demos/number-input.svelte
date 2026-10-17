<script lang="ts">
	import { NumberInput } from '@fractaldesign/fractalsvelte-ui/styler';

	let seats = $state(3);
</script>

<div class="grid-2 gap-md wfull">
	<NumberInput label="Seats" bind:value={seats} min={1} max={20} helperText="Between 1 and 20." />
	<NumberInput label="Ratio" value={0.5} step={0.1} min={0} max={1} variant="outline" />
</div>
