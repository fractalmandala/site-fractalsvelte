<script lang="ts">
	import { Badge, Button, SlideUnlock } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let slideUnlocked = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<SlideUnlock
			bind:unlocked={slideUnlocked}
			label="Slide to confirm"
			successLabel="Action confirmed!"
		/>
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<Button size="sm" variant="outline" onclick={() => (slideUnlocked = false)}>
				Reset Slider
			</Button>
			<Badge variant={slideUnlocked ? 'success' : 'outline'}>
				{slideUnlocked ? 'State: Unlocked' : 'State: Locked'}
			</Badge>
		</div>
	</div>
</ComponentDoc>
