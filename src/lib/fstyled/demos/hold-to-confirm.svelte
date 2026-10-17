<script lang="ts">
	import { HoldToConfirm } from '@fractaldesign/fractalsvelte-ui/styler';

	let deleted = $state(0);
</script>

<div class="box xcenter gap-sm">
	<HoldToConfirm size="lg" onconfirm={() => (deleted += 1)}>Hold to delete</HoldToConfirm>
	<p class="text-body-sm text-secondary">Confirmed {deleted} times. Space and Enter hold too.</p>
</div>
