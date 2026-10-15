<script lang="ts">
	import { AnimatedCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<AnimatedCard>
			<div class="box gap-xs">
				<h4 class="card-title text-primary">Hover elevation</h4>
				<p class="text-body-sm text-muted">A gentle lift and a glowing border follow your pointer.</p>
			</div>
		</AnimatedCard>
	</div>
</ComponentDoc>
