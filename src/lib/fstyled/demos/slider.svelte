<script lang="ts">
	import { Slider } from '@fractaldesign/fractalsvelte-ui/styler';

	let volume = $state(64);
</script>

<div class="box gap-lg wfull">
	<Slider label="Volume" bind:value={volume} showValue />
	<Slider
		label="Opacity"
		value={0.4}
		min={0}
		max={1}
		step={0.05}
		showValue
		formatValue={(v) => `${Math.round(v * 100)}%`}
		tone="info"
	/>
	<Slider label="Disabled" value={30} disabled />
</div>
