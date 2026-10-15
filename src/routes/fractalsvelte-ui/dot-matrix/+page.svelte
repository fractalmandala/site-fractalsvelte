<script lang="ts">
	import { Button, DotMatrix } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let dotText = $state('READY');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<div class="row ycenter xcenter gap-sm wrap wfull gap-lg">
			<DotMatrix text={dotText} color="green" glow />
			<DotMatrix text="12:45" color="amber" glow />
			<DotMatrix text="LIVE" color="cyan" glow />
		</div>
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<Button size="sm" variant="outline" onclick={() => (dotText = dotText === 'READY' ? 'ONLINE' : 'READY')}>
				Cycle Text
			</Button>
		</div>
	</div>
</ComponentDoc>
