<script lang="ts">
	import { AspectRatio } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<AspectRatio ratio="16/9" class="radius-md border">
		<svg viewBox="0 0 16 9" class="text-muted"
			><rect width="16" height="9" fill="currentColor" opacity="0.2" /></svg
		>
	</AspectRatio>
	<AspectRatio ratio="1/1" class="radius-md border">
		<svg viewBox="0 0 1 1" class="text-theme"
			><rect width="1" height="1" fill="currentColor" opacity="0.25" /></svg
		>
	</AspectRatio>
</div>
