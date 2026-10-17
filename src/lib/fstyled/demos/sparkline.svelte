<script lang="ts">
	import { Sparkline } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ycenter xcenter gap-lg wrap">
	<Sparkline data={[10, 25, 18, 30, 45, 38, 55, 62]} />
	<Sparkline data={[60, 52, 58, 40, 35, 28, 20]} tone="danger" />
	<Sparkline data={[3, 8, 5, 9, 4, 10, 6, 12]} tone="info" fill={false} width={160} />
</div>
