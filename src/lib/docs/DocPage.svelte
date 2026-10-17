<script lang="ts">
	// One component's documentation page, for any library. Every section renders a
	// field from the normalized model, so a manifest field is either shown here or
	// named in scripts/check-docs.ts — never silently dropped.
	import { setContext, type Component } from 'svelte';
	import { Icon } from 'fractalicons';
	import { luArrowLeft, luArrowRight } from 'fractalicons/lucide';
	import { reGithubLine } from 'fractalicons/remix';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import PropsTable from '#lib/components/PropsTable.svelte';
	import type { Crumb } from '#lib/seo.js';
	import type { ResolvedComponent } from '#lib/docs/model.js';
	import { EXAMPLES, type Code, type CodeSample, type DemoLoader } from '#lib/docs/examples.js';

	let {
		component: c,
		set,
		crumbs,
		import: importCode = null,
		usage = null,
		examples = [],
		samples = [],
		helpers = null,
		source = null,
		wrapPreview = true,
		loadDemo
	}: {
		component: ResolvedComponent;
		set: { id: string; base: string; title: string; package: string };
		crumbs: Crumb[];
		import?: Code | null;
		usage?: Code | null;
		examples?: Code[];
		samples?: CodeSample[];
		helpers?: Code | null;
		source?: Code | null;
		wrapPreview?: boolean;
		loadDemo?: DemoLoader;
	} = $props();

	// machines-ui demos print each <Example>'s markup from here. Read once: a page's
	// examples never change while it is open.
	// svelte-ignore state_referenced_locally
	setContext(EXAMPLES, { samples, next: 0 });

	const variants = $derived(c.props.filter((p) => p.values?.length));
</script>

<section class="content-section narrow-full box gap-md">
	<header class="page-header">
		<Breadcrumbs {crumbs} />
		<h1 class="page-title mt-lg tt-c weight-600">{c.displayName}</h1>
		<p class="page-desc text-secondary lh16">{c.description}</p>
	</header>
	<article class="box gap-3xl">
		{#if importCode}
			<section class="box gap-lg">
			<CodeBlock title="import" code={importCode.code} html={importCode.html} />
			</section>
		{/if}
		{#if c.hasPreview}
			<section class="box gap-lg">
				<h2 id="preview" class="page-heading-xl text-primary">
					{samples.length ? 'Examples' : 'Preview'}
				</h2>
			{#if loadDemo}
				{#await loadDemo() then mod}
					{@const Demo = mod.default as Component}
					{#if wrapPreview}
						<div
							class="row xcenter ycenter wrap gap-lg pad-xl border radius-sm bg-sunken relative minw0"
						>
							<Demo />
						</div>
					{:else}
						<div class="box gap-lg">
							<Demo />
						</div>
					{/if}
				{:catch err}
					<p class="text-body text-muted">Demo failed to load: {err.message}</p>
				{/await}
			{:else}
				<p class="text-body text-muted">No live preview for this component.</p>
			{/if}
			{#if helpers}
				<CodeBlock title="svelte" code={helpers.code} html={helpers.html} />
			{/if}
		</section>
	{/if}
	{#if usage}
		<section class="box gap-lg">
			<h2 id="usage" class="page-heading-xl text-primary">Usage</h2>
			<p class="text-body text-secondary lh15">The code behind the preview above.</p>
			<CodeBlock title="+page.svelte" code={usage.code} html={usage.html} />
		</section>
	{/if}
	{#if examples.length}
		<section class="box gap-lg">
			<h2 id="examples" class="page-heading-xl text-primary">Library examples</h2>
			<p class="text-body text-secondary lh15">
				Authored with the component in {set.package}.
			</p>
			{#each examples as example, i (i)}
				<CodeBlock title="Example {i + 1}" code={example.code} html={example.html} />
			{/each}
		</section>
	{/if}
	{#if variants.length}
		<section class="box gap-lg">
			<h2 id="variants" class="page-heading-xl text-primary">Variants &amp; dimensions</h2>
			<div class="grid-2 fs-shelf">
				{#each variants as v (v.name)}
					<div class="box gap-sm pad-md bg-surface fs-shelf-cell">
						<div class="row ycenter xbetween gap-sm">
							<code class="text-primary weight-600">{v.name}</code>
							{#if v.default}
								<span class="text-body text-muted">default <code>{v.default}</code></span>
							{/if}
						</div>
						<div class="row ycenter gap-xs wrap">
							{#each v.values ?? [] as value (value)}
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
	<section class="box gap-lg">
		<h2 id="props" class="page-heading-xl text-primary">Props</h2>
		{#if c.extends}
			<p class="text-body text-secondary lh15">
				Also accepts every attribute of
				<code class="bg-sunken radius-xs px-xs text-sm text-primary">{c.extends.base}</code>
				{#if c.extends.omit.length}
					(without {c.extends.omit.join(', ')})
				{/if}, spread onto the root element.
			</p>
		{/if}
		{#if c.props.length}
			<PropsTable props={c.props} />
		{:else}
			<p class="text-body text-secondary">This component takes no props of its own.</p>
		{/if}
	</section>
	{#if c.snippets.length}
		<section class="box gap-lg">
			<h2 id="snippets" class="page-heading-xl text-primary">Snippets &amp; callbacks</h2>
			<PropsTable props={c.snippets} />
		</section>
	{/if}
	{#if c.slots.length}
		<section class="box gap-lg">
			<h2 id="slots" class="page-heading-xl text-primary">Slots</h2>
			<div class="scroll-x border radius-sm">
				<table class="wfull text-md">
					<thead>
						<tr>
							<th class="px-md py-sm bb ta-l text-primary weight-600">Slot</th>
							<th class="px-md py-sm bb ta-l text-primary weight-600">Props</th>
						</tr>
					</thead>
					<tbody>
						{#each c.slots as slot (slot.name)}
							<tr>
								<td class="px-md py-sm bb-sub ta-l"
									><code class="text-primary">{slot.name}</code></td
								>
								<td class="px-md py-sm bb-sub ta-l"
									><code class="text-secondary">{slot.props ?? '—'}</code></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
	{#if c.types.length}
		<section class="box gap-lg">
			<h2 id="types" class="page-heading-xl text-primary">Exported types</h2>
			<div class="box gap-sm">
				{#each c.types as t (t.name)}
					<div class="box gap-xs">
						<code class="text-body text-primary"
							>{t.kind} {t.name}{t.definition ? ` = ${t.definition}` : ''}</code
						>
						{#if t.doc}<span class="text-body text-secondary lh15">{t.doc}</span>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}
	{#if c.tokens.length}
		<section class="box gap-lg">
			<h2 id="theming" class="page-heading-xl text-primary">Theming tokens</h2>
			<p class="text-body text-secondary lh15">CSS custom properties this component reads.</p>
			<div class="row gap-xs wrap">
				{#each c.tokens as token (token)}
					<code class="chip bg-sunken text-secondary">{token}</code>
				{/each}
			</div>
		</section>
	{/if}
	{#if c.classes.length}
		<section class="box gap-lg">
			<h2 id="classes" class="page-heading-xl text-primary">CSS classes</h2>
			<p class="text-body text-secondary lh15">Classes this component's markup uses.</p>
			<div class="row gap-xs wrap">
				{#each c.classes as cls (cls)}
					<code class="chip bg-sunken text-secondary">{cls}</code>
				{/each}
			</div>
		</section>
	{/if}
	{#if Object.keys(c.renames).length}
		<section class="box gap-lg">
			<h2 id="renames" class="page-heading-xl text-primary">Renamed props</h2>
			<div class="scroll-x border radius-sm">
				<table class="wfull text-md">
					<thead>
						<tr>
							<th class="px-md py-sm bb ta-l text-primary weight-600">Prop</th>
							<th class="px-md py-sm bb ta-l text-primary weight-600">Renames</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(c.renames) as [name, target] (name)}
							<tr>
								<td class="px-md py-sm bb-sub ta-l"><code class="text-primary">{name}</code></td>
								<td class="px-md py-sm bb-sub ta-l"><code class="text-secondary">{target}</code></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
	{#if c.motion}
		<section class="box gap-lg">
			<h2 id="behaviour" class="page-heading-xl text-primary">Behaviour</h2>
			<ul class="box gap-xs">
				{#if c.motion.animatedProp}
					<li class="text-body text-secondary lh15">
						Runs live; set <code class="text-primary">animated={'{false}'}</code> to freeze it.
					</li>
				{/if}
				{#if c.motion.reveal}
					<li class="text-body text-secondary lh15">Reveals itself when scrolled into view.</li>
				{/if}
				{#if c.motion.reducedMotion}
					<li class="text-body text-secondary lh15">Honours prefers-reduced-motion.</li>
				{/if}
				{#if c.hasChildren}
					<li class="text-body text-secondary lh15">Renders any children you pass it.</li>
				{/if}
			</ul>
		</section>
	{/if}
	{#if c.uses.length || c.usedBy.length}
		<section class="box gap-lg">
			<h2 id="related" class="page-heading-xl text-primary">Related</h2>
			{#each [{ label: 'Built from', list: c.uses }, { label: 'Used by', list: c.usedBy }] as group (group.label)}
				{#if group.list.length}
					<div class="box gap-xs">
						<p class="text-body text-muted">{group.label}</p>
						<div class="row gap-sm wrap">
							{#each group.list as r (r.slug)}
								<a href="{set.base}/{r.slug}" class="link text-body">{r.name}</a>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</section>
	{/if}
	{#if source}
		<section class="box gap-lg">
			<h2 id="source" class="page-heading-xl text-primary">Source</h2>
			<details class="box gap-md">
				<summary class="text-body text-secondary link-plain">
					Show the {c.name}.svelte source ({c.source?.file})
				</summary>
				<CodeBlock title="{c.name}.svelte" code={source.code} html={source.html} />
			</details>
		</section>
	{/if}
	<nav class="row xbetween gap-md wrap bt pt-lg" aria-label="{set.title} components">
		{#if c.previous}
			<a href="{set.base}/{c.previous.slug}" class="link-parent box gap-xs">
				<span class="row ycenter gap-xs text-body text-muted"
					><Icon icon={luArrowLeft} size={14} /> Previous</span
				>
				<span class="link-title page-heading-bs">{c.previous.name}</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if c.next}
			<a href="{set.base}/{c.next.slug}" class="link-parent box xright gap-xs">
				<span class="row ycenter gap-xs text-body text-muted"
					>Next <Icon icon={luArrowRight} size={14} /></span
				>
				<span class="link-title page-heading-bs">{c.next.name}</span>
			</a>
		{/if}
	</nav>
	</article>
</section>
