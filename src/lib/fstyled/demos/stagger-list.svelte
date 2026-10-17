<script lang="ts">
	import { StaggerList, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let run = $state(0);
	const steps = ['Provision', 'Build', 'Test', 'Deploy', 'Verify'].map((label, i) => ({
		id: `s${i}`,
		label
	}));
</script>

<div class="box gap-sm wfull">
	{#key run}
		<StaggerList items={steps} stagger={150}>
			{#snippet itemSnippet({ item, index })}
				<div class="row ycenter gap-sm pad-sm border-subtle radius-sm text-sm">
					<span class="mono text-muted">{index + 1}</span>{item.label}
				</div>
			{/snippet}
		</StaggerList>
	{/key}
	<Button variant="secondary" onclick={() => (run += 1)}>Replay</Button>
</div>
