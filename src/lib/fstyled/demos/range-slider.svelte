<script lang="ts">
	import { RangeSlider } from '@fractaldesign/fractalsvelte-ui/styler';

	let lo = $state(25);
	let hi = $state(70);
</script>

<div class="box gap-lg wfull">
	<RangeSlider
		label="Price range"
		bind:minVal={lo}
		bind:maxVal={hi}
		showValues
		formatValue={(v) => `$${v}`}
	/>
	<RangeSlider
		label="Hours"
		minVal={9}
		maxVal={17}
		min={0}
		max={24}
		minDistance={2}
		showValues
		tone="success"
	/>
</div>
