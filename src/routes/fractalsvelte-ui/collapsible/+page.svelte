<script lang="ts">
	import { Collapsible } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<Collapsible title="Click to reveal details">
			<p class="text-body-sm text-muted pad-bs bg-surface radius-sm">
				The panel animates its height open and closed, so nothing below it jumps.
			</p>
		</Collapsible>
	</div>
</ComponentDoc>
