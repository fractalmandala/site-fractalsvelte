<!--
	Share-image template (1200×630), rendered to PNG by sveltekit-og/satori at build
	time. Satori takes inline styles only, which is why this lives outside src/ and
	away from the fractalstyler contract. Same language as the site: white paper, a
	dashed frame with + corners and a [ CAPTION ], the split orange wordmark.
-->
<script lang="ts">
	import { og } from './tokens';

	let {
		caption,
		eyebrow,
		title,
		mark,
		subtitle,
		code
	}: {
		caption: string;
		eyebrow: string;
		/** Plain title, or a wordmark split into its muted and orange halves */
		title?: string;
		mark?: [string, string];
		subtitle?: string;
		code?: string;
	} = $props();

	const heading = $derived(mark ? mark.join('') : (title ?? ''));
	const size = $derived(heading.length > 22 ? 72 : heading.length > 14 ? 88 : 104);
	const corner = `position: absolute; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: ${og.paper}; color: ${og.theme}; font-size: 28px; font-weight: 700; line-height: 1;`;
</script>

<div
	style="display: flex; width: 100%; height: 100%; background: {og.paper}; padding: 48px; font-family: '{og.sans}'; color: {og.ink};"
>
	<div
		style="position: relative; display: flex; flex-direction: column; justify-content: space-between; flex: 1; border: 2px dashed {og.theme}; padding: 64px 64px 56px;"
	>
		<span style="{corner} top: -15px; left: -15px;">+</span>
		<span style="{corner} top: -15px; right: -15px;">+</span>
		<span style="{corner} bottom: -15px; left: -15px;">+</span>
		<span style="{corner} bottom: -15px; right: -15px;">+</span>
		<span
			style="position: absolute; top: -17px; left: 48px; display: flex; background: {og.theme}; color: {og.paper}; font-size: 20px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; padding: 6px 14px;"
			>[ {caption} ]</span
		>

		<div style="display: flex; flex-direction: column;">
			<span
				style="display: flex; font-size: 24px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: {og.theme}; margin-bottom: 20px;"
				>{eyebrow}</span
			>
			<div
				style="display: flex; font-size: {size}px; font-weight: 800; letter-spacing: -3px; line-height: 1;"
			>
				{#if mark}
					<span style="color: {og.grey};">{mark[0]}</span><span style="color: {og.theme};"
						>{mark[1]}</span
					>
				{:else}
					<span>{title}</span>
				{/if}
			</div>
			{#if subtitle}
				<span
					style="display: flex; font-size: 30px; font-weight: 400; line-height: 1.35; color: {og.grey}; margin-top: 24px; max-width: 920px;"
					>{subtitle}</span
				>
			{/if}
		</div>

		<div style="display: flex; align-items: center; justify-content: space-between;">
			{#if code}
				<span
					style="display: flex; font-family: '{og.mono}'; font-weight: 500; font-size: 26px; color: {og.ink}; background: {og.sunken}; border: 1px solid {og.hair}; padding: 12px 20px;"
					>{code}</span
				>
			{:else}
				<span style="display: flex;"></span>
			{/if}
			<div style="display: flex; font-size: 30px; font-weight: 800; letter-spacing: -1px;">
				<span style="color: {og.grey};">fractal</span><span style="color: {og.theme};">svelte</span>
			</div>
		</div>
	</div>
</div>
