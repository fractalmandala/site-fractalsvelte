<script lang="ts">
	import { Progress } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box fs-measure-md gap-bs">
		<Progress value={78} max={100} showValue label="Sync Progress" />
		<Progress indeterminate label="Indeterminate Activity" />
	</div>
</ComponentDoc>
