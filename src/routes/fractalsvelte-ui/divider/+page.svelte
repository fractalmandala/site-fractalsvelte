<script lang="ts">
	import { Divider } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box fs-measure-md gap-bs">
		<Divider label="OR CONTINUE WITH" />
		<Divider />
	</div>
</ComponentDoc>
