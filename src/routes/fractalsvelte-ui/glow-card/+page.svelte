<script lang="ts">
	import { GlowCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<GlowCard glowColor="rgba(99, 102, 241, 0.4)">
			<div class="box gap-xs pad-lg">
				<h4 class="card-title text-primary">Radial spotlight</h4>
				<p class="text-body-sm text-muted">Border glows according to pointer coordinates.</p>
			</div>
		</GlowCard>
	</div>
</ComponentDoc>
