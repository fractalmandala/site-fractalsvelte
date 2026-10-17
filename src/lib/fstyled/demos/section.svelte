<script lang="ts">
	import { Section, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<Section
	eyebrow="Section"
	title="A titled section"
	subtitle="With an action on the right."
	spacing="md"
	class="wfull"
>
	{#snippet action()}<Button variant="secondary" size="md">Action</Button>{/snippet}
	<p class="text-body text-secondary">Section body.</p>
</Section>
