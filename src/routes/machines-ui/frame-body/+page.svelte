<script lang="ts">
	import { Frame, FrameBody } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
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
</MachineDoc>
