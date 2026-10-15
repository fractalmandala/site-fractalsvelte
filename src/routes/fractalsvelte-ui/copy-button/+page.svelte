<script lang="ts">
	import { CopyButton } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<CopyButton text="pnpm add @fractaldesign/fractalsvelte-ui" label="Copy Command" copiedLabel="Copied Command!" />
	</div>
</ComponentDoc>
