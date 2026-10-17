<script lang="ts">
	import { ColorPicker } from '@fractaldesign/fractalsvelte-ui/styler';

	let color = $state('#3b82f6');
</script>

<div class="box gap-sm wfull">
	<ColorPicker label="Accent" bind:value={color} />
	<p class="text-body-sm text-secondary">Value: <code class="mono">{color}</code></p>
</div>
