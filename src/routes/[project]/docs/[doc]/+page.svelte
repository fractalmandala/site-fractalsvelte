<script lang="ts">
	import { Icon } from 'fractalicons';
	import { luArrowLeft, luArrowRight } from 'fractalicons/lucide';
	import DocsShell from '#lib/components/DocsShell.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Wordmark from '#lib/components/Wordmark.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const meta = $derived(data.doc.meta);
	const Doc = $derived(data.doc.component);
</script>

<DocsShell toc={meta.toc}>
	<PageHeader eyebrow={data.project.slug} title={meta.title} lede={meta.description}>
		<p class="text-body-sm text-muted">
			From <code class="bg-sunken radius-xs px-xs text-sm text-secondary">{meta.source}</code> ·
			<a href="/{data.project.slug}" class="link"><Wordmark mark={data.project.mark} /> overview</a>
		</p>
	</PageHeader>

	<Doc />

	<nav class="row xbetween gap-md wrap bt pt-lg" aria-label="Guides">
		{#if data.previous}
			<a href="/{data.project.slug}/docs/{data.previous.slug}" class="link-parent box gap-xs">
				<span class="row ycenter gap-xs text-body-sm text-muted"
					><Icon icon={luArrowLeft} size={14} /> Previous</span
				>
				<span class="link-title page-heading-bs">{data.previous.title}</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if data.next}
			<a href="/{data.project.slug}/docs/{data.next.slug}" class="link-parent box xright gap-xs">
				<span class="row ycenter gap-xs text-body-sm text-muted"
					>Next <Icon icon={luArrowRight} size={14} /></span
				>
				<span class="link-title page-heading-bs">{data.next.title}</span>
			</a>
		{/if}
	</nav>
</DocsShell>
