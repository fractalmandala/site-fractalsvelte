<script lang="ts">
	import { Badge, SplitReveal } from '@fractaldesign/fractalsvelte-ui';

	let splitRevealed = $state(false);
</script>

<div class="fs-measure-lg">
	<SplitReveal bind:revealed={splitRevealed} label="HOVER OR CLICK TO SPLIT">
		{#snippet revealedContent()}
			<div class="box xcenter gap-xs ta-c">
				<Badge variant="success">Revealed</Badge>
				<h4 class="card-title text-theme">Hidden content unveiled</h4>
				<p class="text-body-sm text-muted">Dual shutters slide outward with spring easing.</p>
			</div>
		{/snippet}
	</SplitReveal>
</div>
