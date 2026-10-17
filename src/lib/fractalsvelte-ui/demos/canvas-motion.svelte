<script lang="ts">
	import { CanvasMotion } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-lg fs-stage-md border radius-sm">
	<CanvasMotion
		particleCount={50}
		particleColor="rgba(255, 62, 0, 0.7)"
		lineColor="rgba(255, 62, 0, 0.2)"
	/>
</div>
<p class="text-body-sm text-muted">Move your pointer over the canvas to pull the constellation.</p>
