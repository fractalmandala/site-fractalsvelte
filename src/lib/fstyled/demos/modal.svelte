<script lang="ts">
	import { Modal, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let open = $state(false);
	let placement = $state<'center' | 'top' | 'left' | 'right' | 'top-edge' | 'bottom-edge'>(
		'center'
	);
</script>

<div class="row ycenter xcenter gap-sm wrap">
	<Button onclick={() => ((placement = 'center'), (open = true))}>Centre</Button>
	<Button variant="secondary" onclick={() => ((placement = 'top'), (open = true))}>Top</Button>
	<Button variant="secondary" onclick={() => ((placement = 'right'), (open = true))}
		>Right edge</Button
	>
	<Button variant="secondary" onclick={() => ((placement = 'bottom-edge'), (open = true))}
		>Bottom edge</Button
	>
</div>
<Modal bind:open {placement} aria-label="Modal shell demo" panelClass="pad-lg gap-sm">
	<h2 class="page-heading-lg">Modal shell</h2>
	<p class="text-body-sm text-secondary">
		Placement: {placement}. Escape or a click outside closes it.
	</p>
	<Button onclick={() => (open = false)}>Close</Button>
</Modal>
