<script lang="ts">
	import { Badge, Button, SlideUnlock } from '@fractaldesign/fractalsvelte-ui';

	let slideUnlocked = $state(false);
</script>

<div class="box gap-md wfull">
	<SlideUnlock
		bind:unlocked={slideUnlocked}
		label="Slide to confirm"
		successLabel="Action confirmed!"
	/>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Button size="sm" variant="outline" onclick={() => (slideUnlocked = false)}>
			Reset Slider
		</Button>
		<Badge variant={slideUnlocked ? 'success' : 'outline'}>
			{slideUnlocked ? 'State: Unlocked' : 'State: Locked'}
		</Badge>
	</div>
</div>
