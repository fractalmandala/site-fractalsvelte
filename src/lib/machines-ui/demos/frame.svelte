<script lang="ts">
	import { Frame, FrameBody } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<Frame title="USAGE" pad="md">
		<FrameBody>
			<p>Content goes inside the frame.</p>
		</FrameBody>
	</Frame>
</Example>
<Example>
	<Frame title="MARCH" motion="march" dash="long" pad="md">
		<FrameBody>
			<p>Content goes inside the frame.</p>
		</FrameBody>
	</Frame>
</Example>
<Example>
	<Frame title="SCAN" motion="scan" dash="dot" corner="◆" cornerBlink pad="md">
		<FrameBody>
			<p>Content goes inside the frame.</p>
		</FrameBody>
	</Frame>
</Example>
<Example>
	<Frame title="DRAW" motion="draw" dash="solid" pad="lg">
		<FrameBody>
			<p>Content goes inside the frame.</p>
		</FrameBody>
	</Frame>
</Example>
