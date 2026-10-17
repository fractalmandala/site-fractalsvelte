<script lang="ts">
	import { Anchor, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let shown = $state(true);
	const placements = ['top-start', 'top', 'top-end', 'left', 'bottom', 'right'] as const;
</script>

<div class="grid-3 gap-xl wfull">
	{#each placements as placement (placement)}
		<div class="row xcenter py-xl">
			<Anchor {placement} open={shown}>
				{#snippet trigger()}<Button variant="secondary" size="md">{placement}</Button>{/snippet}
				{#snippet panel()}<span class="chip bg-raised border shadow-md truncate">{placement}</span
					>{/snippet}
			</Anchor>
		</div>
	{/each}
</div>
<Button variant="outline" onclick={() => (shown = !shown)}>{shown ? 'Hide' : 'Show'} panels</Button>
