<script lang="ts">
	// The chrome of one machines-ui docs page. The page passes its <Example> blocks as
	// children; their code comes from the page's own source (see server/machines-ui.ts).
	import '@fractaldesign/machines-ui/style.css';
	import { setContext, type Snippet } from 'svelte';
	import { Icon } from 'fractalicons';
	import { luArrowLeft, luArrowRight } from 'fractalicons/lucide';
	import { reGithubLine } from 'fractalicons/remix';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import PropsTable from '#lib/components/PropsTable.svelte';
	import type { Crumb } from '#lib/seo.js';
	import type { MachinePage } from '#lib/server/machines-ui.js';
	import { BASE, EXAMPLES, PACKAGE, type ExampleContext } from './catalog.js';

	let {
		doc: c,
		crumbs,
		children
	}: { doc: MachinePage; crumbs: Crumb[]; children: Snippet } = $props();

	// read once: a page's examples never change while it is open
	// svelte-ignore state_referenced_locally
	setContext<ExampleContext>(EXAMPLES, { samples: c.examples, next: 0 });
</script>

<section class="content-section narrow-full">
	<div class="box gap-3xl py-xl">
		<div class="box gap-lg">
			<Breadcrumbs {crumbs} />
			<PageHeader eyebrow="{c.familyLabel} · {PACKAGE}" title={c.displayName} lede={c.description}>
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
			<p class="text-body-sm text-secondary lh15">
				Load the stylesheet once (usually in your root layout), then import components by name.
			</p>
			<CodeBlock title="import" code={c.import.code} html={c.import.html} />
		</section>

		<section class="box gap-lg">
			<h2 id="examples" class="page-heading-xl text-primary">Examples</h2>
			<p class="text-body-sm text-secondary lh15">
				Live, from the installed package. The code under each preview is exactly what renders it.
			</p>
			{@render children()}
			{#if c.helpers}
				<CodeBlock title="Data used by the examples" code={c.helpers.code} html={c.helpers.html} />
			{/if}
		</section>

		{#if c.props.length}
			<section class="box gap-md">
				<h2 id="props" class="page-heading-xl text-primary">Props</h2>
				<PropsTable props={c.props} />
			</section>
		{/if}

		{#if c.snippets.length}
			<section class="box gap-md">
				<h2 id="snippets" class="page-heading-xl text-primary">Snippets &amp; callbacks</h2>
				<PropsTable props={c.snippets} />
			</section>
		{/if}

		{#if c.notes.length}
			<section class="box gap-md">
				<h2 id="behaviour" class="page-heading-xl text-primary">Behaviour</h2>
				<ul class="box gap-xs">
					{#each c.notes as note (note)}
						<li class="text-body text-secondary lh15">{note}</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if c.types.length}
			<section class="box gap-md">
				<h2 id="types" class="page-heading-xl text-primary">Exported types</h2>
				<div class="box gap-sm">
					{#each c.types as t (t.name)}
						<div class="box gap-xs">
							<code class="text-body-sm text-primary"
								>{t.kind} {t.name}{t.definition ? ` = ${t.definition}` : ''}</code
							>
							{#if t.doc}<span class="text-body-sm text-secondary lh15">{t.doc}</span>{/if}
						</div>
					{/each}
				</div>
			</section>
		{/if}

		{#if c.tokens.length}
			<section class="box gap-md">
				<h2 id="theming" class="page-heading-xl text-primary">Theming</h2>
				<p class="text-body-sm text-secondary lh15">CSS custom properties this component reads.</p>
				<div class="row gap-xs wrap">
					{#each c.tokens as token (token)}
						<code class="chip bg-sunken text-secondary">{token}</code>
					{/each}
				</div>
			</section>
		{/if}

		{#if c.used.length || c.usedBy.length}
			<section class="box gap-md">
				<h2 id="related" class="page-heading-xl text-primary">Related</h2>
				{#each [{ label: 'Built from', list: c.used }, { label: 'Used by', list: c.usedBy }] as group (group.label)}
					{#if group.list.length}
						<div class="box gap-xs">
							<p class="text-body-sm text-muted">{group.label}</p>
							<div class="row gap-sm wrap">
								{#each group.list as r (r.slug)}
									<a href="{BASE}/{r.slug}" class="link text-body-sm">{r.name}</a>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</section>
		{/if}

		<nav class="row xbetween gap-md wrap bt pt-lg" aria-label="machines-ui components">
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
	</div>
</section>
