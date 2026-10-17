<script lang="ts">
	import { RangeSlider } from '@fractaldesign/fractalsvelte-ui';

	let rangeMin = $state(25);
	let rangeMax = $state(75);
</script>

<div class="fs-measure-sm">
	<RangeSlider
		label="Price Window"
		bind:minVal={rangeMin}
		bind:maxVal={rangeMax}
		min={0}
		max={100}
	/>
</div>
