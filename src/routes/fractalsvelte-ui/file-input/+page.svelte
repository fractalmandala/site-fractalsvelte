<script lang="ts">
	import { FileInput } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<FileInput label="Upload Assets" description="Drag & drop PNG, SVG, or JSON" />
	</div>
</ComponentDoc>
