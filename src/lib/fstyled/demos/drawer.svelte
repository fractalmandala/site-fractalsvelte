<script lang="ts">
	import { Drawer, Button, Checkbox } from '@fractaldesign/fractalsvelte-ui/styler';

	const edges = ['left', 'right', 'top', 'bottom'] as const;
	let open = $state(false);
	let placement = $state<(typeof edges)[number]>('right');
</script>

<div class="row ycenter xcenter gap-sm wrap">
	{#each edges as edge (edge)}
		<Button variant="secondary" onclick={() => ((placement = edge), (open = true))}>{edge}</Button>
	{/each}
</div>
<Drawer bind:open {placement} title="Filters" description="Placement: {placement}">
	<Checkbox label="Only active" checked />
	<Checkbox label="Include archived" />
	{#snippet footer()}<Button onclick={() => (open = false)}>Apply</Button>{/snippet}
</Drawer>
