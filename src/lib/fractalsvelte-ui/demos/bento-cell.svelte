<script lang="ts">
	import { Badge, BentoCell, BentoGrid } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-lg">
	<BentoGrid columns={3} gap="md">
		<BentoCell
			colSpan={2}
			glow
			title="Spans two columns"
			description="colSpan and rowSpan place a cell; glow lights its border on hover."
		/>
		<BentoCell rowSpan={2} variant="raised" title="Two rows" description="rowSpan={2}">
			{#snippet footer()}
				<Badge variant="success">raised</Badge>
			{/snippet}
		</BentoCell>
		<BentoCell variant="sunken" title="Sunken" description="variant='sunken'" />
		<BentoCell variant="surface" padding="sm" title="Tight" description="padding='sm'" />
	</BentoGrid>
</div>
