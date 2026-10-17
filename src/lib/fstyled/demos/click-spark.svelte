<script lang="ts">
	import { ClickSpark } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<ClickSpark class="border radius-md"
		><div class="pad-xl text-body-sm">Click for sparks</div></ClickSpark
	>
	<ClickSpark class="border radius-md" tone="warning" sparkCount={14} sparkRadius={32}
		><div class="pad-xl text-body-sm">More, further</div></ClickSpark
	>
</div>
