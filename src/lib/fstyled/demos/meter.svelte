<script lang="ts">
	import { Meter } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<Meter label="Disk usage" value={82} low={30} high={75} optimum={10} showValue />
	<Meter label="Battery" value={64} low={20} high={80} optimum={90} showValue />
	<Meter
		label="Latency (ms)"
		value={120}
		min={0}
		max={500}
		low={150}
		high={300}
		optimum={50}
		showValue
		size="lg"
	/>
</div>
