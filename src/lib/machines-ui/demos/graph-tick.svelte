<script lang="ts">
	import { Frame, FrameBody, GraphTick, GraphTrack } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

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
