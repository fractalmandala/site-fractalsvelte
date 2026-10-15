<script lang="ts">
	import { AspectRatio } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<AspectRatio ratio="16/9">
			<div class="box xcenter ycenter full bg-raised border radius-sm text-theme weight-600">
				16:9 frame
			</div>
		</AspectRatio>
	</div>
</ComponentDoc>
