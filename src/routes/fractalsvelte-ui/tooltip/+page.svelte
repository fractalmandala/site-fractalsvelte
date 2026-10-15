<script lang="ts">
	import { Button, Tooltip } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Tooltip content="Helpful contextual tooltip" placement="top">
			<Button variant="secondary">Hover Top</Button>
		</Tooltip>
		<Tooltip content="Bottom positioned tooltip" placement="bottom">
			<Button variant="outline">Hover Bottom</Button>
		</Tooltip>
	</div>
</ComponentDoc>
