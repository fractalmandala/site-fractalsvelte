<script lang="ts">
	import { Container } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-frame fs-measure-lg pad-bs">
		<Container size="sm">
			<p class="text-body ta-c text-muted bg-surface pad-bs">
				A small container: centred, capped at its max-width, with fluid side padding.
			</p>
		</Container>
	</div>
</ComponentDoc>
