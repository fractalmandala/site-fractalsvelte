<script lang="ts">
	import { TagInput } from '@fractaldesign/fractalsvelte-ui/styler';

	let tags = $state(['svelte', 'runes']);
</script>

<div class="box gap-sm wfull">
	<TagInput label="Topics" bind:tags maxTags={5} />
	<p class="text-body-sm text-secondary">Enter or comma adds, Backspace removes.</p>
</div>
