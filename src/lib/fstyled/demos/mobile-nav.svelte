<script lang="ts">
	import { MobileNav, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let open = $state(false);
	let position = $state<'left' | 'right' | 'top' | 'bottom'>('left');
</script>

<div class="row ycenter xcenter gap-sm wrap">
	<Button onclick={() => ((position = 'left'), (open = true))}>Open left</Button>
	<Button variant="secondary" onclick={() => ((position = 'right'), (open = true))}
		>Open right</Button
	>
	<Button variant="secondary" onclick={() => ((position = 'bottom'), (open = true))}
		>Open bottom</Button
	>
</div>
<MobileNav bind:open {position} title="Menu">
	<a class="nav-link" href="#preview">Preview</a>
	<a class="nav-link" href="#usage">Usage</a>
	<a class="nav-link" href="#props">Props</a>
</MobileNav>
