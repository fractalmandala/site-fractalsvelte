<script lang="ts">
	import { Button } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let btnLoading = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<p class="fs-eyebrow text-body-sm weight-600 text-muted">Variants Matrix</p>
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="soft">Soft</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
		</div>

		<p class="fs-eyebrow text-body-sm weight-600 text-muted">Sizes & States</p>
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<Button size="xs">XS Size</Button>
			<Button size="sm">SM Size</Button>
			<Button size="md">MD Size</Button>
			<Button size="lg">LG Size</Button>
			<Button size="xl">XL Size</Button>
			<Button shape="pill" variant="primary">Pill Shape</Button>
			<Button disabled>Disabled</Button>
			<Button variant="primary" loading={btnLoading} onclick={() => { btnLoading = true; setTimeout(() => btnLoading = false, 1500); }}>
				{btnLoading ? 'Saving...' : 'Click to Load'}
			</Button>
		</div>
	</div>
</ComponentDoc>
