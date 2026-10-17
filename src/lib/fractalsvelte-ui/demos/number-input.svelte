<script lang="ts">
	import { NumberInput } from '@fractaldesign/fractalsvelte-ui';

	let numberValue = $state(5);
</script>

<div class="fs-measure-sm">
	<NumberInput label="Quantity" bind:value={numberValue} min={1} max={100} step={1} />
</div>
