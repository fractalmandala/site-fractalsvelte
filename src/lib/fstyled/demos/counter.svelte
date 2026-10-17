<script lang="ts">
	import { Counter, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let total = $state(1280);
</script>

<div class="row ycenter xcenter gap-md wrap">
	<Counter value={total} prefix="$" />
	<Counter value={total / 100} decimals={2} suffix="k" size="xl" />
	<Button variant="secondary" onclick={() => (total += 315)}>Add 315</Button>
</div>
