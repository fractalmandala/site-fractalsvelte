<script lang="ts">
	import { Frame, FrameBody } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<Frame title="BODY">
		<FrameBody>
			<p>Row one</p>
			<p>Row two</p>
			<p>Row three</p>
		</FrameBody>
	</Frame>
</Example>
<Example>
	<Frame title="BODY">
		<FrameBody tight>
			<p>Row one</p>
			<p>Row two</p>
			<p>Row three</p>
		</FrameBody>
	</Frame>
</Example>
