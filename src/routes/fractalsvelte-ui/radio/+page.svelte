<script lang="ts">
	import { Radio } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row gap-lg">
		<Radio name="demo_radio" value="opt1" checked label="Option Alpha" />
		<Radio name="demo_radio" value="opt2" label="Option Beta" />
		<Radio name="demo_radio" value="opt3" disabled label="Disabled" />
	</div>
</ComponentDoc>
