<script lang="ts">
	import { SizeReadout } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box xcenter gap-sm">
	<SizeReadout width={1280} height={720} />
	<SizeReadout width={64} height={64} count={3} label="Icons" />
	<SizeReadout width={420} height={180} copied="#3b82f6" led={false} />
</div>
