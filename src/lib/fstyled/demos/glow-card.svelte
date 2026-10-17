<script lang="ts">
	import { GlowCard } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<GlowCard>
		<span class="card-title">GlowCard</span>
		<span class="text-body-sm text-secondary">The border lights up under the pointer.</span>
	</GlowCard>
	<GlowCard tone="info" surface="sunken" glowSize={200}>
		<span class="card-title">Info tone</span>
		<span class="text-body-sm text-secondary">Smaller glow on a sunken surface.</span>
	</GlowCard>
</div>
