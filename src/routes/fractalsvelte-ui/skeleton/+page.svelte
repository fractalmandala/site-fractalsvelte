<script lang="ts">
	import { Skeleton } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box fs-measure-sm gap-md">
		<Skeleton height="1.75rem" width="60%" />
		<Skeleton height="1rem" width="100%" />
		<Skeleton height="1rem" width="85%" />
	</div>
</ComponentDoc>
