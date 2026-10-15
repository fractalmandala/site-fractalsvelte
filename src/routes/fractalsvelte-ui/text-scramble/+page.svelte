<script lang="ts">
	import { Button, TextScramble } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let scrambleTarget = $state('QUANTUM RUNES ONLINE');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull">
		<div class="row ycenter xcenter mono text-2xl weight-700 text-theme">
			<TextScramble text={scrambleTarget} trigger="mount" />
		</div>
		<div class="row ycenter xcenter gap-sm wrap wfull">
			<Button size="sm" variant="outline" onclick={() => scrambleTarget = scrambleTarget === 'QUANTUM RUNES ONLINE' ? 'SYSTEM PROTOCOL VERIFIED' : 'QUANTUM RUNES ONLINE'}>
				Re-Scramble Text
			</Button>
		</div>
	</div>
</ComponentDoc>
