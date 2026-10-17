<script lang="ts">
	import { Tooltip, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ycenter xcenter gap-lg wrap py-xl">
	<Tooltip content="On top"><Button variant="secondary">Top</Button></Tooltip>
	<Tooltip content="On the right" placement="right"
		><Button variant="secondary">Right</Button></Tooltip
	>
	<Tooltip content="Below" placement="bottom"><Button variant="secondary">Bottom</Button></Tooltip>
	<Tooltip content="Instant" delay={0} placement="left"
		><Button variant="secondary">Left</Button></Tooltip
	>
</div>
