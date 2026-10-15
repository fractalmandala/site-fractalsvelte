<script lang="ts">
	import { MagnetLines } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<MagnetLines rows={7} columns={7} />
		<span class="text-body-sm text-muted">Move cursor across the grid to deflect vector lines.</span>
	</div>
</ComponentDoc>
