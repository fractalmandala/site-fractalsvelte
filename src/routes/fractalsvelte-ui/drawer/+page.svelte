<script lang="ts">
	import { Button, Drawer } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let drawerOpen = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div>
		<Button variant="outline" onclick={() => drawerOpen = true}>Open Side Drawer</Button>
		<Drawer bind:open={drawerOpen} placement="right" title="Drawer Panel">
			<p class="text-primary text-body-sm">Slide-over navigation or details drawer.</p>
		</Drawer>
	</div>
</ComponentDoc>
