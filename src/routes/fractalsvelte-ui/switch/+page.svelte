<script lang="ts">
	import { Switch } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let switchChecked = $state(true);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter gap-xl">
		<Switch bind:checked={switchChecked} label="Dark Mode Sync" />
		<Switch size="sm" checked label="Compact Switch" />
		<Switch disabled label="Disabled Switch" />
	</div>
</ComponentDoc>
