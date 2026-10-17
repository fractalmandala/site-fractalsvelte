<script lang="ts">
	import { Grid, Card } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<Grid columns={3} gap="sm">
		{#each [1, 2, 3] as n (n)}<Card padding="sm" title="grid-3 · {n}" />{/each}
	</Grid>
	<Grid columns="auto-fit" gap="sm">
		{#each [1, 2, 3, 4] as n (n)}<Card
				padding="sm"
				variant="secondary"
				title="Auto-fit {n}"
			/>{/each}
	</Grid>
</div>
