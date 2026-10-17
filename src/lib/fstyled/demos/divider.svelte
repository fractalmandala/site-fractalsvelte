<script lang="ts">
	import { Divider } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<Divider />
	<Divider label="Divider with label" />
	<Divider label="Start" labelPosition="start" variant="strong" />
	<div class="row ycenter h-lg">
		<span class="text-sm">Left</span>
		<Divider orientation="vertical" />
		<span class="text-sm">Right</span>
	</div>
</div>
