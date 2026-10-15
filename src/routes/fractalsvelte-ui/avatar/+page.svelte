<script lang="ts">
	import { Avatar } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Avatar initials="AP" alt="Amrit Patel" size="lg" status="online" />
		<Avatar initials="DM" alt="DeepMind Team" size="md" status="busy" />
		<Avatar initials="SK" alt="SvelteKit Core" size="sm" status="away" />
		<Avatar initials="FD" alt="Fractal Design" size="xs" shape="rounded" />
	</div>
</ComponentDoc>
