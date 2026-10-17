<script lang="ts">

    import { page } from '$app/state'
    import LibraryNav from '#lib/components/LibraryNav.svelte'
    import Toc from '#lib/components/Toc.svelte'
    import { guides } from '#lib/docs/fractalstyler-guides.js'
    import type { TocEntry } from '#lib/content.js'

    let { children } = $props()

    const nav = [
        { id: 'guides', label: 'Guides', links: guides.map((g) => ({ name: g.title, slug: g.slug })) }
    ]
    const toc = $derived((page.data as { toc?: TocEntry[] }).toc ?? [])

</script>

<aside class="sidebar-left py-xl">
    <LibraryNav title="fractalstyler docs" base="/fractalstyler/docs" groups={nav} />
</aside>
<section class="main-section">
    {@render children()}
</section>
<aside class="sidebar-right py-xl">
    {#if toc.length}
        <Toc entries={toc} />
    {/if}
</aside>
