<script lang="ts">
	import { LidarSweep } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="row ycenter xcenter gap-sm wrap wfull gap-xl">
	<LidarSweep mode="radar" label="RADAR TRACKING" intent="primary" />
	<LidarSweep mode="linear" label="TERRAIN LIDAR" intent="success" />
</div>
