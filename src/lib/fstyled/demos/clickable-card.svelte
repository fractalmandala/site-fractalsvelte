<script lang="ts">
	import { ClickableCard } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luArrowRight } from 'fractalicons/lucide';

	let clicks = $state(0);
</script>

<div class="grid-2 gap-md wfull">
	<ClickableCard
		title="Clickable card"
		description="Clicked {clicks} times."
		onclick={() => (clicks += 1)}
	/>
	<ClickableCard href="/fstyled/card" title="Link card" description="Goes to the Card page.">
		{#snippet headerExtra()}<Icon icon={luArrowRight} />{/snippet}
	</ClickableCard>
</div>
