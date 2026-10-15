<script lang="ts">
	import { ClickSpark } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<ClickSpark sparkCount={12} sparkRadius={28} sparkSize={12}>
		<div class="fs-frame box xcenter gap-xs pad-2xl bg-surface ta-c">
			<h4 class="card-title text-primary">Click anywhere inside</h4>
			<p class="text-body-sm text-muted">Sparks radiate from the exact point you click.</p>
		</div>
	</ClickSpark>
</ComponentDoc>
