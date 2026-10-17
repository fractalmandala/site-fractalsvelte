<script lang="ts">
	import { Popover, Button, Input } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ycenter xcenter gap-lg wrap pb-3xl">
	<Popover label="Share">
		{#snippet trigger({ toggle })}<Button variant="outline" onclick={toggle}>Share</Button
			>{/snippet}
		<span class="text-sm weight-600">Share link</span>
		<Input value="https://fractalsvelte.dev/fstyled" readonly size="md" />
	</Popover>
	<Popover label="Info" placement="right">
		{#snippet trigger({ toggle })}<Button variant="ghost" onclick={toggle}>Placed right</Button
			>{/snippet}
		<p class="text-body-sm">Anchored without offsets.</p>
	</Popover>
</div>
