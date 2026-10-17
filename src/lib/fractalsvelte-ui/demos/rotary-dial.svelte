<script lang="ts">
	import { RotaryDial } from '@fractaldesign/fractalsvelte-ui';

	let rotaryVal = $state(45);
</script>

<div class="row ycenter xcenter gap-sm wrap wfull gap-xl">
	<RotaryDial bind:value={rotaryVal} size="sm" label="Gain" unit="dB" />
	<RotaryDial bind:value={rotaryVal} size="md" label="Volume" unit="%" />
	<RotaryDial bind:value={rotaryVal} size="lg" label="Frequency" unit="Hz" />
</div>
