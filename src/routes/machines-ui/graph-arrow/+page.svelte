<script lang="ts">
	import { Frame, FrameBody, GraphArrow } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<Frame title="ARROW">
			<FrameBody>
				<div class="row ycenter gap-sm">
					<span>build</span>
					<GraphArrow accent={false} stretch={false} />
					<span>ship</span>
				</div>
			</FrameBody>
		</Frame>
	</Example>
	<Example>
		<Frame title="ARROW">
			<FrameBody>
				<div class="row ycenter gap-sm">
					<span>build</span>
					<GraphArrow accent stretch />
					<span>ship</span>
				</div>
			</FrameBody>
		</Frame>
	</Example>
</MachineDoc>
