<script lang="ts">
	import { Card } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull fs-measure-md">
		<p class="fs-eyebrow text-body-sm weight-600 text-muted">Surface & Outline Variants</p>
		<div class="box gap-bs wfull">
			<Card title="Surface Card" description="Elevated container with standard border">
				Pure scoped CSS provides style encapsulation and fast SSR rendering.
			</Card>
			<Card variant="sunken" title="Sunken Card" description="Subtle recessed surface background">
				Ideal for secondary detail panels and form sections.
			</Card>
		</div>
	</div>
</ComponentDoc>
