<script lang="ts">
	import { EqualizerBars, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let playing = $state(true);
</script>

<div class="row ycenter xcenter gap-lg wrap">
	<EqualizerBars {playing} />
	<EqualizerBars bars={9} tone="info" size="3xl" {playing} />
	<Button variant="secondary" onclick={() => (playing = !playing)}
		>{playing ? 'Pause' : 'Play'}</Button
	>
</div>
