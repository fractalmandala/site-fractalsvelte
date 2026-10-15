<script lang="ts">
	import DocsShell from '#lib/components/DocsShell.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let query = $state('');

	const total = $derived(data.groups.reduce((n, g) => n + g.components.length, 0));
	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return data.groups
			.map((g) => ({
				...g,
				components: q
					? g.components.filter(
							(c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
						)
					: g.components
			}))
			.filter((g) => g.components.length);
	});
	const toc = $derived(
		data.groups.map((g) => ({ depth: 2, id: g.id, text: `${g.label} (${g.components.length})` }))
	);
</script>

<svelte:head>
	<title>Components — {data.project.slug} — fractalsvelte</title>
	<meta name="description" content="API reference for every {data.project.slug} component." />
</svelte:head>

<DocsShell {toc}>
	<PageHeader
		eyebrow={data.project.slug}
		title="Components"
		lede="{total} components. Each page lists its props, snippets and an example you can copy."
	>
		<p class="text-body-sm text-muted lh15">{data.origin}</p>
		<input
			class="input wfull"
			data-variant="outline"
			data-size="lg"
			data-shape="square"
			type="search"
			placeholder="Filter {total} components"
			aria-label="Filter components"
			bind:value={query}
		/>
	</PageHeader>

	{#each filtered as group (group.id)}
		<section class="box gap-md">
			<h2 id={group.id} class="page-heading-xl text-primary">{group.label}</h2>
			<div class="grid-2 fs-shelf">
				{#each group.components as component (component.slug)}
					<a
						href="/{data.project.slug}/components/{component.slug}"
						class="link-parent box gap-xs pad-md bg-surface fs-shelf-cell"
					>
						<span class="link-title page-heading-bs">{component.name}</span>
						<span class="text-body-sm text-secondary lh15">{component.description}</span>
					</a>
				{/each}
			</div>
		</section>
	{:else}
		<p class="text-body text-secondary">No component matches “{query}”.</p>
	{/each}
</DocsShell>
