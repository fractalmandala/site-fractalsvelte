<script lang="ts">
	import { HeroBlock, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<HeroBlock
	badge="v0.8"
	title="Ship closed-world UI"
	description="Components styled only by fractalstyler classes."
	class="wfull"
>
	{#snippet actions()}
		<Button size="lg">Get started</Button>
		<Button size="lg" variant="outline">Docs</Button>
	{/snippet}
</HeroBlock>
