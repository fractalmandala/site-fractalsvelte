<script lang="ts">
	import { ConfettiBurst, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let confetti: ReturnType<typeof ConfettiBurst> | undefined = $state();
</script>

<div class="box gap-sm wfull">
	<Button onclick={() => confetti?.burst()}>Burst confetti</Button>
	<ConfettiBurst bind:this={confetti} ratio="16/9" class="border radius-md" />
</div>
