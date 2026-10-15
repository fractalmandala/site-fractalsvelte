<script lang="ts">
	import { Frame, FrameBody, GraphTick, GraphTrack } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<Frame title="TRACK">
			<FrameBody>
				<GraphTrack>
					{#each ['█', '█', '█', '█', '░', '░', '░', '░'] as glyph, i (i)}
						<GraphTick>{glyph}</GraphTick>
					{/each}
				</GraphTrack>
			</FrameBody>
		</Frame>
	</Example>
</MachineDoc>
