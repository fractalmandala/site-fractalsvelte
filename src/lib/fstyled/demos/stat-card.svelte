<script lang="ts">
	import { StatCard, Sparkline } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-3 gap-md wfull">
	<StatCard title="Revenue" value="$48,120" delta="+12.4%" timeframe="vs last month">
		{#snippet sparkline()}<Sparkline data={[4, 9, 7, 12, 10, 15, 18]} />{/snippet}
	</StatCard>
	<StatCard title="Churn" value="2.1%" delta="-0.4%" timeframe="30d" />
	<StatCard title="Seats" value="128" delta="0" timeframe="flat" />
</div>
