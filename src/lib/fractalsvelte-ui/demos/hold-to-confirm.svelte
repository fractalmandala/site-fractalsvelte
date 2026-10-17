<script lang="ts">
	import { HoldToConfirm } from '@fractaldesign/fractalsvelte-ui';

	let holdConfirmedCount = $state(0);
</script>

<div class="box gap-md wfull">
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<HoldToConfirm holdTime={1200} variant="destructive" onconfirm={() => holdConfirmedCount++}>
			Hold to Delete Cluster
		</HoldToConfirm>
		<HoldToConfirm
			holdTime={1000}
			variant="primary"
			shape="pill"
			onconfirm={() => holdConfirmedCount++}
		>
			Hold to Deploy
		</HoldToConfirm>
	</div>
	<div class="text-body-sm text-muted ta-c">
		Press and hold button for 1.2s to trigger confirm action. Completed confirmations: <strong
			>{holdConfirmedCount}</strong
		>
	</div>
</div>
