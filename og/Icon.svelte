<!-- App icon / favicon, rendered by satori: "fs" in white on the theme orange. -->
<script lang="ts">
	import { og } from './tokens';

	let { size }: { size: number } = $props();
</script>

<div
	style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; background: {og.theme}; font-family: '{og.sans}'; font-weight: 800; color: {og.paper}; font-size: {Math.round(
		size * 0.56
	)}px; letter-spacing: {-Math.round(size * 0.03)}px; line-height: 1; padding-bottom: {Math.round(
		size * 0.06
	)}px;"
>
	fs
</div>
