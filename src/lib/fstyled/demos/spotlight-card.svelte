<script lang="ts">
	import { SpotlightCard } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<SpotlightCard>
		<span class="card-title">SpotlightCard</span>
		<span class="text-body-sm text-secondary">The spotlight follows the pointer.</span>
	</SpotlightCard>
	<SpotlightCard tone="success" radius={180}>
		<span class="card-title">Success tone</span>
		<span class="text-body-sm text-secondary">A tighter beam.</span>
	</SpotlightCard>
</div>
