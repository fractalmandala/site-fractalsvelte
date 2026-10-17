<script lang="ts">
	import { page } from '$app/state';
	import { Icon } from 'fractalicons';
	import { luArrowLeft, luArrowRight } from 'fractalicons/lucide';
	import { findGuide, guides } from '#lib/docs/fractalstyler-guides.js';
	const guide = $derived(findGuide(page.params.doc ?? '')!);
	const index = $derived(guide ? guides.findIndex((g) => g.slug === guide.slug) : -1);
	const previous = $derived(index > 0 ? guides[index - 1] : null);
	const next = $derived(index >= 0 && index < guides.length - 1 ? guides[index + 1] : null);
</script>

<section class="content-section narrow-full">
	<header class="page-header">
		<h1 class="page-title weight-600">{guide.title}</h1>
		<p class="page-desc text-secondary lh16">{guide.description}</p>
	</header>
	<article class="box sitedocs gap-xl">
			{#if guide}
		{@const Doc = guide.component}
		<Doc />
	{/if}
		<nav class="row xbetween gap-md wrap bt pt-lg" aria-label="fractalstyler docs">
			{#if previous}
				<a href="/fractalstyler/docs/{previous.slug}" class="link-parent box gap-xs">
					<span class="row ycenter gap-xs text-body text-muted"
						><Icon icon={luArrowLeft} size={14} /> Previous</span
					>
					<span class="link-title page-heading-bs">{previous.title}</span>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if next}
				<a href="/fractalstyler/docs/{next.slug}" class="link-parent box xright gap-xs">
					<span class="row ycenter gap-xs text-body text-muted"
						>Next <Icon icon={luArrowRight} size={14} /></span
					>
					<span class="link-title page-heading-bs">{next.title}</span>
				</a>
			{/if}
		</nav>
	</article>
</section>
