<script lang="ts">
	import { LidarSweep } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull gap-xl">
		<LidarSweep mode="radar" label="RADAR TRACKING" intent="primary" />
		<LidarSweep mode="linear" label="TERRAIN LIDAR" intent="success" />
	</div>
</ComponentDoc>
