<script lang="ts">
	import { Button, ButtonGroup } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<ButtonGroup>
			<Button variant="outline">Left</Button>
			<Button variant="outline">Center</Button>
			<Button variant="outline">Right</Button>
		</ButtonGroup>
	</div>
</ComponentDoc>
