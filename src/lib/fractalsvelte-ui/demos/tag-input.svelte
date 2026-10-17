<script lang="ts">
	import { TagInput } from '@fractaldesign/fractalsvelte-ui';

	let tagsList = $state(['Svelte 5', 'Runes', 'Design tokens']);
</script>

<div class="fs-measure-md box gap-sm">
	<TagInput bind:tags={tagsList} placeholder="Type tag and press Enter..." />
	<p class="text-body-sm text-muted">
		Active tags: {tagsList.join(', ')}
	</p>
</div>
