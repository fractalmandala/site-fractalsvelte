<script lang="ts">
	import { Select } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let selectValue = $state('svelte');
	const selectOptions = [
		{ label: 'Svelte 5 Runes', value: 'svelte' },
		{ label: 'TypeScript Strict', value: 'typescript' },
		{ label: 'Vite Ecosystem', value: 'vite' },
		{ label: 'Scoped Tokens', value: 'tokens' }
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-sm">
		<Select options={selectOptions} bind:value={selectValue} label="Primary Framework" />
	</div>
</ComponentDoc>
