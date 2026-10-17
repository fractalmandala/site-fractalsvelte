<script lang="ts">
	import { SizeReadout } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="box gap-md wfull">
	<div class="row ycenter xcenter gap-sm wrap wfull gap-bs">
		<SizeReadout width={384} height={216} label="FRAME 1" />
		<SizeReadout width={1920} height={1080} copied="PNG" />
		<SizeReadout width={640} height={480} count={4} />
	</div>
</div>
