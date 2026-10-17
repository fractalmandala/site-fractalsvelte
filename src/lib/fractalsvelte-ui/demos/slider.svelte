<script lang="ts">
	import { Slider } from '@fractaldesign/fractalsvelte-ui';

	let sliderValue = $state(65);
</script>

<div class="fs-measure-sm">
	<Slider label="Volume Level" bind:value={sliderValue} min={0} max={100} showValue />
</div>
