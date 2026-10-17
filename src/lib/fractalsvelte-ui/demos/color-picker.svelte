<script lang="ts">
	import { ColorPicker } from '@fractaldesign/fractalsvelte-ui';

	let colorValue = $state('#6366f1');
</script>

<ColorPicker label="Brand Accent" bind:value={colorValue} />
