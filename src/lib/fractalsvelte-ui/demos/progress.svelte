<script lang="ts">
	import { Progress } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="box fs-measure-md gap-bs">
	<Progress value={78} max={100} showValue label="Sync Progress" />
	<Progress indeterminate label="Indeterminate Activity" />
</div>
