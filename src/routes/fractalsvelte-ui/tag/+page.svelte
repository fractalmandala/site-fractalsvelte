<script lang="ts">
	import { Tag } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Tag removable>Svelte 5</Tag>
		<Tag removable>Runes</Tag>
		<Tag variant="primary">Design Tokens</Tag>
		<Tag variant="outline">Scoped CSS</Tag>
	</div>
</ComponentDoc>
