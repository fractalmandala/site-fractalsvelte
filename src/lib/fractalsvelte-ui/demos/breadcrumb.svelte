<script lang="ts">
	import { Breadcrumb } from '@fractaldesign/fractalsvelte-ui';

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Components', href: '/fractalsvelte-ui' },
		{ label: 'Breadcrumb', href: '/fractalsvelte-ui/breadcrumb' }
	];
</script>

<Breadcrumb items={breadcrumbItems} />
