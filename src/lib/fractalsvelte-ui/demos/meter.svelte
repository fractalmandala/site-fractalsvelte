<script lang="ts">
	import { Meter } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-md">
	<Meter value={85} min={0} max={100} low={30} high={80} optimum={90} label="Storage Quota" />
</div>
