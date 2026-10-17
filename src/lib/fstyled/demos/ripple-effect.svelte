<script lang="ts">
	import { RippleEffect } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<RippleEffect class="border"
		><div class="pad-xl text-body-sm">Press anywhere for a ripple</div></RippleEffect
	>
	<RippleEffect class="border" center tone="info" duration={900}
		><div class="pad-xl text-body-sm">Centred, slower, info tone</div></RippleEffect
	>
</div>
