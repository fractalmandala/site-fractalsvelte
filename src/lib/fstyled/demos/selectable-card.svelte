<script lang="ts">
	import { SelectableCard } from '@fractaldesign/fractalsvelte-ui/styler';

	let annual = $state(true);
	let pro = $state(false);
</script>

<div class="grid-2 gap-md wfull">
	<SelectableCard title="Annual billing" description="Save 20%" bind:selected={annual} />
	<SelectableCard
		type="radio"
		title="Pro tier"
		description="Radio semantics"
		bind:selected={pro}
		indicatorPosition="left"
	/>
	<SelectableCard title="Disabled" description="Not available" disabled />
</div>
