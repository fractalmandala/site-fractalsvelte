<script lang="ts">
	import { ShuffleText } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<ShuffleText
		text="MACHINES UI"
		shuffleDirection="right"
		duration={0.4}
		stagger={0.03}
		tag="h2"
		textAlign="center"
	/>
</Example>
