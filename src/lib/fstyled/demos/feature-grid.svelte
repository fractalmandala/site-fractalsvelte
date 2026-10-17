<script lang="ts">
	import { FeatureGrid } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luSparkles, luCheck } from 'fractalicons/lucide';
</script>

<div class="box wfull">
	{#snippet zeroIcon()}<Icon icon={luSparkles} />{/snippet}
	{#snippet checkIcon()}<Icon icon={luCheck} />{/snippet}
	<FeatureGrid
		columns={2}
		items={[
			{
				title: 'Zero CSS',
				description: 'No style blocks, no inline styles.',
				badge: 'core',
				icon: zeroIcon
			},
			{
				title: 'Verified',
				description: 'Every class checked against the compiled stylesheet.',
				icon: checkIcon
			}
		]}
	/>
</div>
