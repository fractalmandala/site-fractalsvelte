<script lang="ts">
	import { DotMatrix } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box xcenter gap-md">
	<DotMatrix text="ONLINE" />
	<DotMatrix text="ERR 503" tone="danger" height={2} />
	<DotMatrix text="12:45" tone="info" glow={false} />
</div>
