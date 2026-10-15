<script lang="ts">
	import { Blockquote } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="fs-measure-md">
		<Blockquote author="Rich Harris" citation="Creator of Svelte">
			Svelte 5 runes bring fine-grained reactivity directly into the language, making state synchronization effortless and explicit.
		</Blockquote>
	</div>
</ComponentDoc>
