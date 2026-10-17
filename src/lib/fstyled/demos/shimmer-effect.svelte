<script lang="ts">
	import { ShimmerEffect } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<ShimmerEffect class="radius-md">
		<div class="pad-lg bg-sunken radius-md text-body-sm">A sheen sweeps across this panel.</div>
	</ShimmerEffect>
	<ShimmerEffect class="radius-md" duration={1.2} angle={45} intensity={0.3}>
		<div class="pad-lg bg-raised border radius-md text-body-sm">Faster, steeper and brighter.</div>
	</ShimmerEffect>
</div>
