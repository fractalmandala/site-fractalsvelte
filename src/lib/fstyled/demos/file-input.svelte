<script lang="ts">
	import { FileInput } from '@fractaldesign/fractalsvelte-ui/styler';

	let files = $state<File[]>([]);
</script>

<div class="box gap-sm wfull">
	<FileInput
		label="Attachments"
		accept=".png,.jpg,.pdf"
		maxSize={5_000_000}
		maxFiles={3}
		multiple
		bind:files
	/>
	<p class="text-body-sm text-secondary">{files.length} file(s) selected</p>
</div>
