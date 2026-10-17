<script lang="ts">
	import { ClickSpark } from '@fractaldesign/fractalsvelte-ui';
</script>

<ClickSpark sparkCount={12} sparkRadius={28} sparkSize={12}>
	<div class="fs-frame box xcenter gap-xs pad-2xl bg-surface ta-c">
		<h4 class="card-title text-primary">Click anywhere inside</h4>
		<p class="text-body-sm text-muted">Sparks radiate from the exact point you click.</p>
	</div>
</ClickSpark>
