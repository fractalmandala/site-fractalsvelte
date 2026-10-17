<script lang="ts">
	// The index of a doc set: set-up code, a filter and the component catalogue.
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import type { SetIndexData } from '#lib/server/docs/load.js';

	let { data }: { data: SetIndexData } = $props();

	let query = $state('');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return data.groups
			.map((g) => ({
				...g,
				components: q
					? g.components.filter(
							(c) =>
								c.name.toLowerCase().includes(q) ||
								c.slug.toLowerCase().includes(q) ||
								c.description.toLowerCase().includes(q)
						)
					: g.components
			}))
			.filter((g) => g.components.length);
	});
</script>

<section class="content-section narrow-full">
    <header class="page-header">
        <Breadcrumbs crumbs={data.seo.breadcrumbs ?? []} />
        <h1 class="page-title mt-lg tt-u">
            {data.set.title.replace('-',' ')}
        </h1>
        <p class="page-desc text-secondary lh15">
            {data.total} Svelte 5 components, each rendered live from the published package. {data.set.intro}
        </p>
    </header>
	<article class="box gap-3xl">
		<section class="box gap-lg">
			<h2 id="setup" class="page-heading-xl text-primary tt-c">Set up</h2>
			<p class="text-body text-secondary lh16">
				Install the package, then load its stylesheet once at the root of your app.
			</p>
			<CodeBlock title="terminal" code={data.install.code} html={data.install.html} />
			<CodeBlock title="src/routes/+layout.svelte" code={data.setup.code} html={data.setup.html} />
			<CodeBlock title="+page.svelte" code={data.use.code} html={data.use.html} />
		</section>
		<section class="box gap-lg">
			<h2 id="components" class="page-heading-xl text-primary">Components</h2>
			<input
				class="input wfull"
				data-variant="outline"
				data-size="lg"
				data-shape="modern"
				type="search"
				placeholder="Search {data.total} components"
				aria-label="Search Components"
				bind:value={query}
			/>
			{#each filtered as group (group.id)}
				<section class="box gap-lg mt-lg">
					<h3 id={group.id} class="page-heading-lg text-primary tt-c">
						{group.label}
					</h3>
					<div class="grid-3 fs-shelf">
						{#each group.components as component (component.slug)}
							<a
								href="{data.set.base}/{component.slug}"
								class="link-parent box gap-xs pad-md bg-surface fs-shelf-cell"
							>
								<span class="link-title">{component.name}</span>
							</a>
						{/each}
					</div>
				</section>
			{:else}
				<p class="text-body text-secondary">No component matches “{query}”.</p>
			{/each}
		</section>
	</article>
</section>
