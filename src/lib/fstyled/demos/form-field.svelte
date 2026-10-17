<script lang="ts">
	import { FormField, Input } from '@fractaldesign/fractalsvelte-ui/styler';

	let name = $state('fractal-ui');
</script>

<div class="box gap-md wfull">
	<FormField
		label="Project name"
		id="proj"
		required
		helperText="Lowercase, no spaces."
		counter="{name.length} / 24"
	>
		<Input id="proj" bind:value={name} />
	</FormField>
	<FormField label="Website" id="site" optional error="Must start with https://">
		<Input id="site" value="http://example.com" variant="outline" />
	</FormField>
</div>
