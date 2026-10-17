<script lang="ts">
	import { Button, Counter } from '@fractaldesign/fractalsvelte-ui';

	let counterVal = $state(1337);
</script>

<div class="box gap-md wfull">
	<div class="row ybot xcenter gap-2xl wrap wfull">
		<Counter value={counterVal} prefix="$" size="lg" />
		<Counter value={Math.round(counterVal * 1.5)} suffix=" req/s" size="md" />
	</div>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Button
			size="sm"
			variant="outline"
			onclick={() => (counterVal = Math.floor(Math.random() * 9000) + 1000)}
		>
			Randomize Counter
		</Button>
		<Button size="sm" variant="primary" onclick={() => (counterVal += 100)}>+100</Button>
	</div>
</div>
