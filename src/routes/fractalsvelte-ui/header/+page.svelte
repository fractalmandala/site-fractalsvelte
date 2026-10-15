<script lang="ts">
	import { Button, Header, SearchInput } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-lg border radius-sm">
		<Header>
			{#snippet brand()}
				<div class="row ycenter gap-sm weight-700 text-theme">
					<span class="chip bg-raised text-theme weight-700">A</span>
					<span>Acme</span>
				</div>
			{/snippet}
			{#snippet center()}
				<div class="fs-measure-sm">
					<SearchInput placeholder="Quick search..." />
				</div>
			{/snippet}
			{#snippet actions()}
				<div class="row ycenter gap-sm">
					<Button size="xs" variant="ghost">Docs</Button>
					<Button size="xs" variant="primary">Deploy</Button>
				</div>
			{/snippet}
		</Header>
	</div>
</ComponentDoc>
