<script lang="ts">
	import { TextScramble, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let scrambler: ReturnType<typeof TextScramble> | undefined = $state();
</script>

<div class="box xcenter gap-md">
	<TextScramble text="DECRYPTING SIGNAL" trigger="both" class="text-xl" />
	<TextScramble bind:this={scrambler} text="Click to scramble" trigger="manual" />
	<Button variant="secondary" onclick={() => scrambler?.scramble()}>Scramble</Button>
</div>
