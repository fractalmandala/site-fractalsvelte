<script lang="ts">
	import { Badge, Button, SharedElement } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let expanded = $state(false);
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	{#if !expanded}
		<SharedElement name="hero-card">
			<button
				type="button"
				class="box gap-xs pad-lg fs-measure-sm bg-surface border radius-md shadow-md ta-l"
				onclick={() => (expanded = true)}
			>
				<Badge variant="primary">Card</Badge>
				<span class="card-title text-primary">Compact preview</span>
				<span class="text-body-sm text-muted">Click to morph it into the expanded card.</span>
			</button>
		</SharedElement>
	{:else}
		<SharedElement name="hero-card">
			<div class="box gap-sm pad-xl fs-measure-md bg-raised border-strong radius-lg shadow-xl">
				<div class="row ycenter xbetween gap-sm">
					<Badge variant="success">Expanded</Badge>
					<Button size="sm" variant="outline" onclick={() => (expanded = false)}>Close</Button>
				</div>
				<h3 class="page-heading-bs text-primary">FLIP morph</h3>
				<p class="text-body-sm text-muted lh16">
					The card animated its size, position and corner radius between the two states with the Web
					Animations API.
				</p>
			</div>
		</SharedElement>
	{/if}
</ComponentDoc>
