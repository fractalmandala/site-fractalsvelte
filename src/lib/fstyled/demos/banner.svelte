<script lang="ts">
	import { Banner, Button } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luInfo } from 'fractalicons/lucide';
</script>

<div class="box gap-sm wfull">
	<Banner intent="info" dismissible>
		{#snippet icon()}<Icon icon={luInfo} />{/snippet}
		Scheduled maintenance on Sunday 02:00 UTC.
	</Banner>
	<Banner intent="success" variant="filled">All systems operational.</Banner>
	<Banner intent="warning" variant="outline">
		Your trial ends in 3 days.
		{#snippet action()}<Button size="md">Upgrade</Button>{/snippet}
	</Banner>
</div>
