<script lang="ts">
	import { LinkButton } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<LinkButton href="/" variant="primary">
			Internal Link
		</LinkButton>
		<LinkButton href="https://svelte.dev" variant="outline" external>
			External Docs
		</LinkButton>
	</div>
</ComponentDoc>
