<script lang="ts">
	import { Frame, FrameBody, FrameRule } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<Frame title="RULE">
		<FrameBody>
			<p>Above the rule</p>
			<FrameRule />
			<p>Below the rule</p>
		</FrameBody>
	</Frame>
</Example>
