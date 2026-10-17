<script lang="ts">
	import { Select } from '@fractaldesign/fractalsvelte-ui/styler';

	let region = $state<string | number | undefined>('eu');
	let framework = $state<string | number | undefined>(undefined);
	const regions = [
		{ value: 'us', label: 'United States', group: 'Americas' },
		{ value: 'br', label: 'Brazil', group: 'Americas' },
		{ value: 'eu', label: 'European Union', group: 'Europe' },
		{ value: 'uk', label: 'United Kingdom', group: 'Europe' },
		{ value: 'in', label: 'India', group: 'Asia' }
	];
	const frameworks = [
		{ value: 'svelte', label: 'SvelteKit' },
		{ value: 'astro', label: 'Astro' },
		{ value: 'next', label: 'Next.js' },
		{ value: 'remix', label: 'Remix', disabled: true },
		{ value: 'nuxt', label: 'Nuxt' }
	];
</script>

<div class="grid-2 gap-md wfull">
	<Select label="Region" options={regions} bind:value={region} clearable />
	<Select label="Framework" options={frameworks} bind:value={framework} searchable clearable />
</div>
