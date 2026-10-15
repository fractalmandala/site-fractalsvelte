<script lang="ts">
	import { MagneticButton } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let magneticClickCount = $state(0);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<MagneticButton variant="primary" strength={0.4} range={120} onclick={() => magneticClickCount++}>
				Magnetic Button
			</MagneticButton>
			<MagneticButton variant="secondary" shape="pill" strength={0.3} range={100} onclick={() => magneticClickCount++}>
				Pill Magnet
			</MagneticButton>
		</div>
		<div class="text-body-sm text-muted ta-c">
			Move your cursor within 120px of the button to see the magnetic pull. Clicks: <strong>{magneticClickCount}</strong>
		</div>
	</div>
</ComponentDoc>
