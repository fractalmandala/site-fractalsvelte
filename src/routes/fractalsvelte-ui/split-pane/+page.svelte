<script lang="ts">
	import { SplitPane } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg fs-stage-sm border radius-sm">
		<SplitPane split={45}>
			{#snippet paneA()}
				<div class="box gap-sm pad-bs hfull bg-surface">
					<h5 class="card-title text-primary">Editor</h5>
					<code class="text-body-sm text-theme">let count = $state(0);</code>
				</div>
			{/snippet}
			{#snippet paneB()}
				<div class="box gap-sm pad-bs hfull bg-sunken">
					<h5 class="card-title text-primary">Output</h5>
					<p class="text-body-sm text-muted">Drag the divider to resize the panes.</p>
				</div>
			{/snippet}
		</SplitPane>
	</div>
</ComponentDoc>
