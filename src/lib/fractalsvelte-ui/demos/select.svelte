<script lang="ts">
	import { Select } from '@fractaldesign/fractalsvelte-ui';

	let selectValue = $state('svelte');
	const selectOptions = [
		{ label: 'Svelte 5 Runes', value: 'svelte' },
		{ label: 'TypeScript Strict', value: 'typescript' },
		{ label: 'Vite Ecosystem', value: 'vite' },
		{ label: 'Scoped Tokens', value: 'tokens' }
	];
</script>

<div class="fs-measure-sm">
	<Select options={selectOptions} bind:value={selectValue} label="Primary Framework" />
</div>
