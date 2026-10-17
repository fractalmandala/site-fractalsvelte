<script lang="ts">
	import { Button, Drawer } from '@fractaldesign/fractalsvelte-ui';

	let drawerOpen = $state(false);
</script>

<div>
	<Button variant="outline" onclick={() => (drawerOpen = true)}>Open Side Drawer</Button>
	<Drawer bind:open={drawerOpen} placement="right" title="Drawer Panel">
		<p class="text-primary text-body-sm">Slide-over navigation or details drawer.</p>
	</Drawer>
</div>
