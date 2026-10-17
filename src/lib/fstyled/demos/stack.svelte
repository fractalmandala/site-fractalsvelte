<script lang="ts">
	import { Stack, Badge } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<Stack direction="row" gap="sm" align="center" justify="between" class="pad-sm border radius-md">
		<span class="text-sm">Row · between</span>
		<Badge variant="surface">end</Badge>
	</Stack>
	<Stack gap="xs" align="center" class="pad-sm border radius-md">
		<span class="text-sm">Column</span>
		<span class="text-sm text-muted">centred</span>
	</Stack>
</div>
