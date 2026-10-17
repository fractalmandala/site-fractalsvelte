<script lang="ts">
	import { BeforeAfter } from '@fractaldesign/fractalsvelte-ui/styler';

	let position = $state(50);
	// two generated SVG images, so the demo needs no assets
	const art = (a: string, b: string) =>
		`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><defs><linearGradient id="g"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="160" height="90" fill="url(#g)"/><circle cx="110" cy="40" r="22" fill="${b}"/></svg>`)}`;
	const before = art('#52525b', '#a1a1aa');
	const after = art('#0ea5e9', '#22c55e');
</script>

<div class="box gap-lg wfull">
	<BeforeAfter
		bind:position
		beforeSrc={before}
		afterSrc={after}
		beforeLabel="Mono"
		afterLabel="Colour"
	/>
	<BeforeAfter>
		{#snippet before()}<div class="pad-xl text-body-sm">
				Before: scoped &lt;style&gt; blocks.
			</div>{/snippet}
		{#snippet after()}<div class="pad-xl text-body-sm text-theme">
				After: fractalstyler classes only.
			</div>{/snippet}
	</BeforeAfter>
</div>
