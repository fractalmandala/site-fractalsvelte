<script lang="ts">
	import { Skeleton } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<div class="row ycenter gap-sm">
		<Skeleton variant="circular" />
		<div class="box gap-xs grow"><Skeleton width="40%" /><Skeleton lines={2} /></div>
	</div>
	<Skeleton variant="rounded" height="6em" />
</div>
