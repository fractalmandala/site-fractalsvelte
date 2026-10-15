<script lang="ts">
	import { Badge, SplitReveal } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let splitRevealed = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg">
		<SplitReveal bind:revealed={splitRevealed} label="HOVER OR CLICK TO SPLIT">
			{#snippet revealedContent()}
				<div class="box xcenter gap-xs ta-c">
					<Badge variant="success">Revealed</Badge>
					<h4 class="card-title text-theme">Hidden content unveiled</h4>
					<p class="text-body-sm text-muted">Dual shutters slide outward with spring easing.</p>
				</div>
			{/snippet}
		</SplitReveal>
	</div>
</ComponentDoc>
