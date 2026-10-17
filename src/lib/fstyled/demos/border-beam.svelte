<script lang="ts">
	import { BorderBeam } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<div class="relative box border radius-md">
		<BorderBeam />
		<div class="box pad-lg text-body-sm">A beam travels round this box.</div>
	</div>
	<div class="relative box border radius-md">
		<BorderBeam tone="info" size={0.4} duration={3} borderWidth={2} />
		<div class="box pad-lg text-body-sm">Longer, faster, thicker.</div>
	</div>
</div>
