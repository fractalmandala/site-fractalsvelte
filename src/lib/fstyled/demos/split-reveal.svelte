<script lang="ts">
	import { SplitReveal } from '@fractaldesign/fractalsvelte-ui/styler';

	let revealed = $state(false);
</script>

<div class="grid-2 gap-md wfull">
	<SplitReveal label="Hover to reveal">
		<span class="card-title">Revealed!</span>
		<span class="text-body-sm text-secondary">The shutters are SVG rects.</span>
	</SplitReveal>
	<SplitReveal orientation="vertical" hoverToReveal={false} bind:revealed label="Click to reveal">
		<span class="card-title">Vertical</span>
		<span class="text-body-sm text-secondary">Revealed: {revealed}</span>
	</SplitReveal>
</div>
