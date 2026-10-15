<script lang="ts">
	import { Breadcrumb } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Components', href: '/fractalsvelte-ui' },
		{ label: 'Breadcrumb', href: '/fractalsvelte-ui/breadcrumb' }
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Breadcrumb items={breadcrumbItems} />
</ComponentDoc>
