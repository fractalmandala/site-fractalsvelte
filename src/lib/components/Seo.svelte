<script lang="ts">
	import { page } from '$app/state';
	import {
		SITE_NAME,
		absolute,
		breadcrumbList,
		ogImagePath,
		organization,
		website,
		type Seo
	} from '#lib/seo.js';

	// Every route's load returns `seo`; the error page has none and stays unindexed.
	const seo = $derived(page.data.seo as Seo | undefined);
	const canonical = $derived(seo && absolute(seo.path));
	const image = $derived(seo && absolute(ogImagePath(seo.path)));

	const jsonLd = $derived(
		seo &&
			JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					website,
					organization,
					...(seo.breadcrumbs?.length ? [breadcrumbList(seo.breadcrumbs)] : []),
					...(seo.jsonLd ?? [])
				]
			})
				// no raw "<" inside the data, so it can never end its script element early
				.replace(/</g, '\\u003c')
	);
	const jsonLdTag = $derived(jsonLd && `<script type="application/ld+json">${jsonLd}<\/script>`);
</script>

<svelte:head>
	{#if seo}
		<title>{seo.title}</title>
		<meta name="description" content={seo.description} />
		<link rel="canonical" href={canonical} />
		<meta name="robots" content="index, follow, max-image-preview:large" />

		<meta property="og:type" content={seo.type ?? 'website'} />
		<meta property="og:site_name" content={SITE_NAME} />
		<meta property="og:locale" content="en_US" />
		<meta property="og:url" content={canonical} />
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:image" content={image} />
		<meta property="og:image:type" content="image/png" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={seo.imageAlt} />
		{#if seo.modified}
			<meta property="article:modified_time" content={seo.modified} />
		{/if}

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={seo.title} />
		<meta name="twitter:description" content={seo.description} />
		<meta name="twitter:image" content={image} />
		<meta name="twitter:image:alt" content={seo.imageAlt} />

		{@html jsonLdTag}
	{:else}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>
