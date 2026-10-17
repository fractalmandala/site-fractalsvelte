<script lang="ts">
	import { Tag } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luStar } from 'fractalicons/lucide';

	let tags = $state(['svelte', 'runes', 'fractalstyler']);
</script>

<div class="row ycenter xcenter gap-sm wrap">
	{#each tags as tag (tag)}
		<Tag removable onremove={() => (tags = tags.filter((t) => t !== tag))}>{tag}</Tag>
	{/each}
	<Tag variant="primary">primary</Tag>
	<Tag variant="outline">outline</Tag>
	<Tag variant="surface">
		{#snippet icon()}<Icon icon={luStar} />{/snippet}
		with icon
	</Tag>
</div>
