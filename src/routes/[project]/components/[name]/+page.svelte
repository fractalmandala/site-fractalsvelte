<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luArrowLeft, luArrowRight } from 'fractalicons/lucide';
	import { reGithubLine } from 'fractalicons/remix';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import DocsShell from '#lib/components/DocsShell.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import PropsTable from '#lib/components/PropsTable.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const c = $derived(data.component);
	const base = $derived(`/${data.project.slug}/components`);
	const toc = $derived(
		[
			c.imports && { depth: 2, id: 'import', text: 'Import' },
			c.examples.length && { depth: 2, id: 'usage', text: 'Usage' },
			{ depth: 2, id: 'props', text: 'Props' },
			c.snippets.length && { depth: 2, id: 'snippets', text: 'Snippets' },
			c.source && { depth: 2, id: 'source', text: 'Source' }
		].filter((e) => !!e)
	);
</script>

<svelte:head>
	<title>{c.name} — {data.project.slug} — fractalsvelte</title>
	<meta name="description" content={c.description} />
</svelte:head>

<DocsShell {toc}>
	<PageHeader eyebrow="{data.project.slug} · {data.group}" title={c.name} lede={c.description}>
		<div class="row ycenter gap-sm wrap">
			<a href={base} class="btn row gap-xs" data-variant="outline" data-shape="square">
				<Icon icon={luArrowLeft} size={16} /> All components
			</a>
			<a href={c.sourceUrl} class="btn row gap-xs" data-variant="outline" data-shape="square">
				<Icon icon={reGithubLine} size={16} /> Source
			</a>
		</div>
	</PageHeader>

	{#if c.imports}
		<section class="box gap-md">
			<h2 id="import" class="page-heading-xl text-primary">Import</h2>
			<CodeBlock title="import" code={c.imports.code} html={c.imports.html} />
		</section>
	{/if}

	{#if c.examples.length}
		<section class="box gap-md">
			<h2 id="usage" class="page-heading-xl text-primary">Usage</h2>
			{#each c.examples as example, i (i)}
				<CodeBlock
					title={c.examples.length > 1 ? `Example ${i + 1}` : 'Example'}
					code={example.code}
					html={example.html}
				/>
			{/each}
		</section>
	{/if}

	<section class="box gap-md">
		<h2 id="props" class="page-heading-xl text-primary">Props</h2>
		{#if c.extends}
			<p class="text-body-sm text-secondary lh15">
				Also accepts every attribute of
				<code class="bg-sunken radius-xs px-xs text-sm text-primary">{c.extends}</code>, spread onto
				the root element.
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

	{#if c.source}
		<section class="box gap-md">
			<h2 id="source" class="page-heading-xl text-primary">Source</h2>
			<details class="box gap-md">
				<summary class="text-body text-secondary link-plain">
					Show the {c.name}.svelte source
				</summary>
				<CodeBlock title="{c.name}.svelte" code={c.source.code} html={c.source.html} />
			</details>
		</section>
	{/if}

	<nav class="row xbetween gap-md wrap bt pt-lg" aria-label="{data.group} components">
		{#if data.previous}
			<a href="{base}/{data.previous.slug}" class="link-parent box gap-xs">
				<span class="row ycenter gap-xs text-body-sm text-muted"
					><Icon icon={luArrowLeft} size={14} /> Previous</span
				>
				<span class="link-title page-heading-bs">{data.previous.name}</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if data.next}
			<a href="{base}/{data.next.slug}" class="link-parent box xright gap-xs">
				<span class="row ycenter gap-xs text-body-sm text-muted"
					>Next <Icon icon={luArrowRight} size={14} /></span
				>
				<span class="link-title page-heading-bs">{data.next.name}</span>
			</a>
		{/if}
	</nav>
</DocsShell>
