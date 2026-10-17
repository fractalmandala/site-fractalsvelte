<script lang="ts">
	import {
		BentoGrid,
		BentoCell,
		Sparkline,
		Counter,
		Badge
	} from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<BentoGrid columns={3} class="wfull">
	<BentoCell colSpan={2} title="Wide cell" description="cspan-2">
		<Sparkline data={[3, 7, 5, 9, 6, 12, 10]} width={220} />
	</BentoCell>
	<BentoCell title="Cell" variant="secondary"><Counter value={42} size="2xl" /></BentoCell>
	<BentoCell title="Status"><Badge variant="success" dot>Healthy</Badge></BentoCell>
	<BentoCell colSpan={2} title="Notes" description="Cells are .card with column spans." />
</BentoGrid>
