<script lang="ts">
	import { PricingCard } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<PricingCard
			tier="Pro Team"
			price="$49"
			interval="/month"
			description="For production engineering teams"
			popular={true}
			features={[
				'All 106 components',
				'AST-verified documentation',
				'Commercial license',
				'Direct Slack channel'
			]}
			ctaText="Upgrade to Pro"
		/>
	</div>
</ComponentDoc>
