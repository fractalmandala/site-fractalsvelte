<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luCheck, luCopy } from 'fractalicons/lucide';

	let { text, label = 'Copy' }: { text: string; label?: string } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1600);
	}
</script>

<button
	type="button"
	data-variant="iconbox"
	data-size="icon-bs"
	class="px-xs text-secondary"
	aria-label={copied ? 'Copied' : label}
	title={copied ? 'Copied' : label}
	onclick={copy}
>
	<Icon icon={copied ? luCheck : luCopy} size={14} />
</button>
