<script lang="ts">
	import { FloatingBadge } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<FloatingBadge variant="primary" pulse>
		Subtle Breathing Motion
	</FloatingBadge>
</ComponentDoc>
