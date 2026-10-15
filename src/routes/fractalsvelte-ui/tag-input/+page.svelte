<script lang="ts">
	import { TagInput } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let tagsList = $state(['Svelte 5', 'Runes', 'Design tokens']);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md box gap-sm">
		<TagInput bind:tags={tagsList} placeholder="Type tag and press Enter..." />
		<p class="text-body-sm text-muted">
			Active tags: {tagsList.join(', ')}
		</p>
	</div>
</ComponentDoc>
