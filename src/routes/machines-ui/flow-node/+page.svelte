<script lang="ts">
	import { FlowNode } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<div class="fs-measure-sm">
			<FlowNode title="CORE" status="done" badge="type">
				<strong>Core Template</strong>
				<p>Triggered when scaffold begins.</p>
			</FlowNode>
		</div>
	</Example>
	<Example>
		<div class="fs-measure-sm">
			<FlowNode title="CORE" status="running">
				<strong>Core Template</strong>
				<p>Triggered when scaffold begins.</p>
			</FlowNode>
		</div>
	</Example>
	<Example>
		<div class="fs-measure-sm">
			<FlowNode title="CORE" selected>
				<strong>Core Template</strong>
				<p>Triggered when scaffold begins.</p>
			</FlowNode>
		</div>
	</Example>
	<Example>
		<div class="fs-measure-sm">
			<FlowNode title="CORE" input="left" outputs={[{ id: 'out', side: 'right' }]}>
				<strong>Core Template</strong>
				<p>Triggered when scaffold begins.</p>
			</FlowNode>
		</div>
	</Example>
	<Example>
		<div class="fs-measure-sm">
			<FlowNode title="CORE" motion="scan" dash="dot" corner="◆" cornerBlink speed={3}>
				<strong>Core Template</strong>
				<p>Triggered when scaffold begins.</p>
			</FlowNode>
		</div>
	</Example>
	<Example>
		<div class="fs-measure-sm">
			<FlowNode title="CORE" look="card" status="running" badge="type" accent="#9875ff">
				<strong>Core Template</strong>
				<p>Triggered when scaffold begins.</p>
			</FlowNode>
		</div>
	</Example>
</MachineDoc>
