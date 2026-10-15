<script lang="ts">
	import { FormField, Input } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<FormField label="Full Name" required helperText="As it appears on your passport">
			<Input placeholder="Amrit Patel" />
		</FormField>
	</div>
</ComponentDoc>
