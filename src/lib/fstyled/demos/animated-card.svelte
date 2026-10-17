<script lang="ts">
	import { AnimatedCard, Badge } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<AnimatedCard>
		{#snippet header()}<span class="card-title">AnimatedCard</span>{/snippet}
		Hover: a pointer-tracked wash and a deeper shadow.
	</AnimatedCard>
	<AnimatedCard variant="sunken" tone="info">
		{#snippet header()}<span class="card-title">Sunken · info</span>{/snippet}
		{#snippet footer()}<Badge variant="info">tone="info"</Badge>{/snippet}
		Another paint and tone.
	</AnimatedCard>
</div>
