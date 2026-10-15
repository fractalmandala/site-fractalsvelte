<script lang="ts">
	import { Checkbox } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let checkboxChecked = $state(true);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md">
		<Checkbox bind:checked={checkboxChecked} label="Enable real-time updates" description="Receive push notifications for critical changes" />
		<Checkbox indeterminate label="Indeterminate tri-state checkbox" />
		<Checkbox disabled label="Disabled checkbox option" />
	</div>
</ComponentDoc>
