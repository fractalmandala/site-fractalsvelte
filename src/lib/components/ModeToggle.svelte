<script lang="ts">
	import { onMount } from 'svelte';
	import { Icon } from 'fractalicons';
	import { luMoon, luSun } from 'fractalicons/lucide';

	const MODE_KEY = 'fractalsvelte:mode';
	let mode = $state<'light' | 'dark'>('light');

	onMount(() => {
		mode = document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light';
	});

	function toggle() {
		mode = mode === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.mode = mode;
		try {
			localStorage.setItem(MODE_KEY, mode);
		} catch {
			// storage unavailable — the mode lasts for this page only
		}
	}
</script>

<button
	type="button"
	data-variant="iconbox"
	data-size="icon-lg"
	class="px-xs text-secondary"
	aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
	onclick={toggle}
>
	<Icon icon={mode === 'dark' ? luSun : luMoon} size={18} />
</button>
