<script lang="ts">
	import { SlideUnlock } from '@fractaldesign/fractalsvelte-ui/styler';

	let unlocked = $state(false);
</script>

<div class="box gap-sm wfull">
	<SlideUnlock bind:unlocked label="Slide to deploy" successLabel="Deployed" />
	<p class="text-body-sm text-secondary ta-c">
		{unlocked ? 'Unlocked: click to reset.' : 'Drag the thumb, or focus and press Enter.'}
	</p>
</div>
