<script lang="ts">
	import { BentoCell, BentoGrid, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<BentoGrid columns={2} class="wfull">
	<BentoCell title="Primary" description="The default paint." />
	<BentoCell title="Soft" variant="soft" description="variant=soft" />
	<BentoCell colSpan={2} title="Spanning two" variant="secondary" padding="md">
		{#snippet footer()}<Button size="md">Action</Button>{/snippet}
	</BentoCell>
</BentoGrid>
