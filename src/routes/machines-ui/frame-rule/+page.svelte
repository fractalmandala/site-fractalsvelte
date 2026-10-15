<script lang="ts">
	import { Frame, FrameBody, FrameRule } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<Frame title="RULE">
			<FrameBody>
				<p>Above the rule</p>
				<FrameRule />
				<p>Below the rule</p>
			</FrameBody>
		</Frame>
	</Example>
</MachineDoc>
