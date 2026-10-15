<script lang="ts">
	import { TextArea } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<TextArea label="Project Notes" placeholder="Type notes here..." maxlength={200} showCount rows={3} autoResize />
	</div>
</ComponentDoc>
