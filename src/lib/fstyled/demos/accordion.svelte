<script lang="ts">
	import { Accordion } from '@fractaldesign/fractalsvelte-ui/styler';

	let value = $state<string | string[]>('a1');
</script>

<div class="box gap-lg wfull">
	<Accordion
		bind:value
		items={[
			{
				id: 'a1',
				title: 'What is closed-world styling?',
				content: 'Every class must exist in the compiled stylesheet.'
			},
			{
				id: 'a2',
				title: 'How does it animate?',
				content: 'The fsx accordion collapses a grid row from 0fr to 1fr.'
			},
			{ id: 'a3', title: 'Disabled item', disabled: true }
		]}
	/>
	<Accordion
		multiple
		variant="secondary"
		items={[
			{ id: 'b1', title: 'Multiple open', content: 'Open several at once.' },
			{ id: 'b2', title: 'Secondary paint', content: 'variant="secondary"' }
		]}
	/>
</div>
