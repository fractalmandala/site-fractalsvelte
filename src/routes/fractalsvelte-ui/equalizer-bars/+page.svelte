<script lang="ts">
	import { Button, EqualizerBars } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let eqPlaying = $state(true);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<div class="row ybot xcenter gap-xl wrap wfull">
			<EqualizerBars bars={5} size="sm" playing={eqPlaying} intent="primary" />
			<EqualizerBars bars={8} size="md" playing={eqPlaying} intent="success" />
			<EqualizerBars bars={12} size="lg" playing={eqPlaying} intent="warning" />
		</div>
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<Button size="sm" variant="outline" onclick={() => (eqPlaying = !eqPlaying)}>
				{eqPlaying ? 'Pause Equalizer' : 'Play Equalizer'}
			</Button>
		</div>
	</div>
</ComponentDoc>
