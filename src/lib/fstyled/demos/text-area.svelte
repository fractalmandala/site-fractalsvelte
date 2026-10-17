<script lang="ts">
	import { TextArea } from '@fractaldesign/fractalsvelte-ui/styler';

	let bio = $state('Designs closed-world systems.\nShips on Fridays.');
</script>

<div class="box gap-md wfull">
	<TextArea
		label="Bio"
		bind:value={bio}
		autoResize
		maxlength={160}
		helperText="Grows with each line."
	/>
	<TextArea label="Notes" variant="outline" rows={2} showCount placeholder="Anything else?" />
</div>
