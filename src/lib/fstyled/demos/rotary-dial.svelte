<script lang="ts">
	import { RotaryDial } from '@fractaldesign/fractalsvelte-ui/styler';

	let gain = $state(42);
</script>

<div class="row ycenter xcenter gap-xl wrap">
	<RotaryDial label="Gain" bind:value={gain} unit="%" />
	<RotaryDial label="Pan" value={50} size="lg" tone="info" />
	<RotaryDial label="Off" value={20} disabled />
</div>
