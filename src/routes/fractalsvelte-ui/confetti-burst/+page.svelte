<script lang="ts">
	import { Button, ConfettiBurst } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let confetti = $state<ReturnType<typeof ConfettiBurst>>();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm fs-stage-sm box xcenter ycenter gap-md bg-surface border radius-md">
		<ConfettiBurst bind:this={confetti} />
		<Button variant="primary" onclick={() => confetti?.burst()}>🎉 Celebrate</Button>
		<span class="text-body-sm text-muted">Each click fires a fresh burst</span>
	</div>
</ComponentDoc>
