<script lang="ts">
	// The chrome of one fractalsvelte-ui docs page. The page itself passes the live demo
	// as children; its Usage block is that same demo, read from the page's source.
	import '@fractaldesign/fractalsvelte-ui/tokens.css';
	import type { Snippet } from 'svelte';
	import { Icon } from 'fractalicons';
	import { luArrowLeft, luArrowRight } from 'fractalicons/lucide';
	import { reGithubLine } from 'fractalicons/remix';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import PropsTable from '#lib/components/PropsTable.svelte';
	import type { Crumb } from '#lib/seo.js';
	import type { ComponentPage } from '#lib/server/fractalsvelte-ui.js';
	import { BASE, PACKAGE } from './catalog.js';
	import ThemeBridge from './ThemeBridge.svelte';

	let {
		doc: c,
		crumbs,
		children
	}: { doc: ComponentPage; crumbs: Crumb[]; children: Snippet } = $props();
</script>

<ThemeBridge />

<section class="content-section narrow-full box gap-3xl">
		<div class="box gap-lg">
			<Breadcrumbs {crumbs} />
			<PageHeader eyebrow="{c.groupLabel} · {PACKAGE}" title={c.name} lede={c.description}>
				<div class="row ycenter gap-sm wrap">
					<a href={BASE} class="btn row gap-xs" data-variant="outline" data-shape="square">
						<Icon icon={luArrowLeft} size={16} /> All components
					</a>
					<a href={c.sourceUrl} class="btn row gap-xs" data-variant="outline" data-shape="square">
						<Icon icon={reGithubLine} size={16} /> Source
					</a>
				</div>
			</PageHeader>
		</div>

		<section class="box gap-md">
			<h2 id="import" class="page-heading-xl text-primary">Import</h2>
			<CodeBlock title="import" code={c.import.code} html={c.import.html} />
		</section>

		<section class="box gap-md">
			<h2 id="preview" class="page-heading-xl text-primary">Preview</h2>
			<p class="text-body-sm text-secondary lh15">
				Live, from the installed package. Every control works.
			</p>
			<div class="row xcenter ycenter wrap gap-lg pad-xl border radius-sm bg-sunken relative minw0">
				{@render children()}
			</div>
		</section>

		<section class="box gap-md">
			<h2 id="usage" class="page-heading-xl text-primary">Usage</h2>
			<p class="text-body-sm text-secondary lh15">The code behind the preview above.</p>
			<CodeBlock title="+page.svelte" code={c.usage.code} html={c.usage.html} />
		</section>

		{#if c.variants.length}
			<section class="box gap-md">
				<h2 id="variants" class="page-heading-xl text-primary">Variants &amp; dimensions</h2>
				<div class="grid-2 fs-shelf">
					{#each c.variants as v (v.name)}
						<div class="box gap-sm pad-md bg-surface fs-shelf-cell">
							<div class="row ycenter xbetween gap-sm">
								<code class="text-primary weight-600">{v.name}</code>
								{#if v.default}
									<span class="text-body-sm text-muted">default <code>{v.default}</code></span>
								{/if}
							</div>
							<div class="row ycenter gap-xs wrap">
								{#each v.values as value (value)}
									<span
										class="chip {value === v.default
											? 'bg-raised text-theme weight-600'
											: 'bg-sunken text-secondary'}">{value}</span
									>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<section class="box gap-md">
			<h2 id="props" class="page-heading-xl text-primary">Props</h2>
			{#if c.extends}
				<p class="text-body-sm text-secondary lh15">
					Also accepts every attribute of
					<code class="bg-sunken radius-xs px-xs text-sm text-primary">{c.extends}</code>, spread
					onto the root element.
				</p>
			{/if}
			{#if c.props.length}
				<PropsTable props={c.props} />
			{:else}
				<p class="text-body text-secondary">This component takes no props of its own.</p>
			{/if}
		</section>

		{#if c.snippets.length}
			<section class="box gap-md">
				<h2 id="snippets" class="page-heading-xl text-primary">Snippets</h2>
				<PropsTable props={c.snippets} />
			</section>
		{/if}

		{#if c.types.length}
			<section class="box gap-md">
				<h2 id="types" class="page-heading-xl text-primary">Exported types</h2>
				<div class="box gap-xs">
					{#each c.types as t (t.name)}
						<code class="text-body-sm text-secondary">type {t.name} = {t.definition}</code>
					{/each}
				</div>
			</section>
		{/if}

		{#if c.source}
			<section class="box gap-md">
				<h2 id="source" class="page-heading-xl text-primary">Source</h2>
				<details class="box gap-md">
					<summary class="text-body text-secondary link-plain">
						Show the {c.name}.svelte source ({c.file})
					</summary>
					<CodeBlock title="{c.name}.svelte" code={c.source.code} html={c.source.html} />
				</details>
			</section>
		{/if}

		<nav class="row xbetween gap-md wrap bt pt-lg" aria-label="fractalsvelte-ui components">
			{#if c.previous}
				<a href="{BASE}/{c.previous.slug}" class="link-parent box gap-xs">
					<span class="row ycenter gap-xs text-body-sm text-muted"
						><Icon icon={luArrowLeft} size={14} /> Previous</span
					>
					<span class="link-title page-heading-bs">{c.previous.name}</span>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if c.next}
				<a href="{BASE}/{c.next.slug}" class="link-parent box xright gap-xs">
					<span class="row ycenter gap-xs text-body-sm text-muted"
						>Next <Icon icon={luArrowRight} size={14} /></span
					>
					<span class="link-title page-heading-bs">{c.next.name}</span>
				</a>
			{/if}
		</nav>
</section>
