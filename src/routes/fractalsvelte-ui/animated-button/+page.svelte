<script lang="ts">
	import { AnimatedButton, Badge } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let animatedClickCount = $state(0);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<AnimatedButton variant="primary" onclick={() => animatedClickCount++}>
				Spring Bounce & Ripple
			</AnimatedButton>
			<AnimatedButton variant="secondary" shape="pill" onclick={() => animatedClickCount++}>
				Pill Spring
			</AnimatedButton>
			<AnimatedButton variant="destructive" onclick={() => animatedClickCount++}>
				Destructive Micro-Scale
			</AnimatedButton>
		</div>
		<div class="text-body-sm text-muted ta-c">
			Press and click buttons to observe tactile spring scaling and ripple wave. Clicks: <Badge variant="primary">{animatedClickCount}</Badge>
		</div>
	</div>
</ComponentDoc>
