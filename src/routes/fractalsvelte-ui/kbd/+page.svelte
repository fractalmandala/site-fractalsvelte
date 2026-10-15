<script lang="ts">
	import { Kbd } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Kbd>⌘</Kbd>
		<Kbd>K</Kbd>
		<span class="text-body-sm text-muted px-sm">or</span>
		<Kbd>Ctrl</Kbd>
		<Kbd>P</Kbd>
		<Kbd>Shift</Kbd>
		<Kbd>↵</Kbd>
	</div>
</ComponentDoc>
