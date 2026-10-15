<script lang="ts">
	import { BeforeAfter } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let position = $state(50);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg box gap-sm">
		<BeforeAfter bind:position beforeLabel="Light" afterLabel="Dark">
			{#snippet before()}
				<div class="box ycenter pad-xl full bg-surface text-primary page-heading-bs" data-theme="light">
					Light surface
				</div>
			{/snippet}
			{#snippet after()}
				<div class="box ycenter xright pad-xl full bg-sunken text-theme page-heading-bs">
					Sunken surface
				</div>
			{/snippet}
		</BeforeAfter>
		<p class="text-body-sm text-muted ta-c">Divider at {Math.round(position)}%</p>
	</div>
</ComponentDoc>
