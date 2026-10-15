<script lang="ts">
	import { Button, CenterMorphModal } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let morphModalOpen = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<CenterMorphModal
			bind:open={morphModalOpen}
			triggerLabel="Open Morph Modal"
			title="Fluid Expanding Dialog"
			description="Scales and morphs smoothly with spring physics from origin."
		>
			{#snippet children({ close })}
				<p class="text-body text-muted mb-bs">
					This modal window animates fluidly into the center of the viewport with backdrop blur and escape key dismissal.
				</p>
				<div class="row gap-sm xright">
					<Button variant="outline" onclick={close}>Cancel</Button>
					<Button variant="primary" onclick={close}>Accept</Button>
				</div>
			{/snippet}
		</CenterMorphModal>
	</div>
</ComponentDoc>
