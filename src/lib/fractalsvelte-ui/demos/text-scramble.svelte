<script lang="ts">
	import { Button, TextScramble } from '@fractaldesign/fractalsvelte-ui';

	let scrambleTarget = $state('QUANTUM RUNES ONLINE');
</script>

<div class="box gap-md wfull">
	<div class="row ycenter xcenter mono text-2xl weight-700 text-theme">
		<TextScramble text={scrambleTarget} trigger="mount" />
	</div>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Button
			size="sm"
			variant="outline"
			onclick={() =>
				(scrambleTarget =
					scrambleTarget === 'QUANTUM RUNES ONLINE'
						? 'SYSTEM PROTOCOL VERIFIED'
						: 'QUANTUM RUNES ONLINE')}
		>
			Re-Scramble Text
		</Button>
	</div>
</div>
