<script lang="ts">
	import { Button, Popover } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let popoverOpen = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Popover bind:open={popoverOpen}>
		{#snippet trigger({ toggle })}
			<Button variant="soft" onclick={toggle}>Toggle Popover</Button>
		{/snippet}
		<div class="box gap-xs pad-bs fs-measure-sm">
			<h4 class="card-title text-primary">Popover content</h4>
			<p class="text-body-sm text-muted">Anchored to its trigger and kept on screen as you scroll.</p>
		</div>
	</Popover>
</ComponentDoc>
