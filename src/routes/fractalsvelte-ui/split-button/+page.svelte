<script lang="ts">
	import { SplitButton } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<SplitButton
			variant="primary"
			onclick={() => {}}
			ondropdown={() => {}}
		>
			Publish Changes
		</SplitButton>
		<SplitButton
			variant="secondary"
			shape="pill"
		>
			Save Draft
		</SplitButton>
	</div>
</ComponentDoc>
