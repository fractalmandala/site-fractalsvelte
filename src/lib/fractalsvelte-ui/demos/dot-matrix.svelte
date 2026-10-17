<script lang="ts">
	import { Button, DotMatrix } from '@fractaldesign/fractalsvelte-ui';

	let dotText = $state('READY');
</script>

<div class="box gap-md wfull">
	<div class="row ycenter xcenter gap-sm wrap wfull gap-lg">
		<DotMatrix text={dotText} color="green" glow />
		<DotMatrix text="12:45" color="amber" glow />
		<DotMatrix text="LIVE" color="cyan" glow />
	</div>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Button
			size="sm"
			variant="outline"
			onclick={() => (dotText = dotText === 'READY' ? 'ONLINE' : 'READY')}
		>
			Cycle Text
		</Button>
	</div>
</div>
