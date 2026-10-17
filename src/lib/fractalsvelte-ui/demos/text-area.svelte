<script lang="ts">
	import { TextArea } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-md">
	<TextArea
		label="Project Notes"
		placeholder="Type notes here..."
		maxlength={200}
		showCount
		rows={3}
		autoResize
	/>
</div>
