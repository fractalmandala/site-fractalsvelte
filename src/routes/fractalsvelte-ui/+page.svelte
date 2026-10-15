<script lang="ts">
	import '@fractaldesign/fractalsvelte-ui/tokens.css';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import { BASE, PACKAGE } from '#lib/fractalsvelte-ui/catalog.js';
	import ThemeBridge from '#lib/fractalsvelte-ui/ThemeBridge.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let query = $state('');

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
</script>

<ThemeBridge />

<section class="content-section narrow-full">
	<div class="box gap-3xl py-xl">
		<div class="box gap-lg">
			<Breadcrumbs crumbs={data.seo.breadcrumbs ?? []} />
			<PageHeader
				eyebrow="Live documentation · {PACKAGE}"
				title="fractalsvelte-ui"
				lede="{data.total} Svelte 5 components, each rendered live from the published package — with its variants, props, snippets and the exact code behind every preview."
			/>
		</div>

		<section class="box gap-md">
			<h2 id="setup" class="page-heading-xl text-primary">Set up</h2>
			<p class="text-body text-secondary lh16">
				Install the package, then import the design tokens once at the root of your app. Every
				component reads its colours, radii and motion from them.
			</p>
			<CodeBlock title="terminal" code={data.install.code} html={data.install.html} />
			<CodeBlock title="src/routes/+layout.svelte" code={data.setup.code} html={data.setup.html} />
			<p class="text-body text-secondary lh16">
				Then import components by name from the package root. Dark mode follows
				<code class="text-primary">data-theme="dark"</code> on any ancestor, usually
				<code class="text-primary">&lt;html&gt;</code>.
			</p>
			<CodeBlock title="+page.svelte" code={data.use.code} html={data.use.html} />
		</section>

		<section class="box gap-lg">
			<h2 id="components" class="page-heading-xl text-primary">Components</h2>
			<input
				class="input wfull"
				data-variant="outline"
				data-size="lg"
				data-shape="square"
				type="search"
				placeholder="Filter {data.total} components"
				aria-label="Filter components"
				bind:value={query}
			/>

			{#each filtered as group (group.id)}
				<section class="box gap-md">
					<h3 id={group.id} class="page-heading-lg text-primary">
						{group.label}
						<span class="text-muted weight-400">{group.components.length}</span>
					</h3>
					<div class="grid-3 fs-shelf">
						{#each group.components as component (component.slug)}
							<a
								href="{BASE}/{component.slug}"
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
		</section>
	</div>
</section>
