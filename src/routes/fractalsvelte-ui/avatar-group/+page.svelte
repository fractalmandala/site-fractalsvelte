<script lang="ts">
	import { Avatar, AvatarGroup } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<AvatarGroup limit={3}>
		<Avatar initials="AR" alt="Alex River" />
		<Avatar initials="SC" alt="Sam Chen" />
		<Avatar initials="TS" alt="Taylor Swift" />
		<Avatar initials="JL" alt="Jordan Lee" />
	</AvatarGroup>
</ComponentDoc>
