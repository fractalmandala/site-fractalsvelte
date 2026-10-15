<script lang="ts">
	import { GraphTerminal } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphTerminal
			title="SHELL"
			lines={[
				{ kind: 'prompt', text: 'cd ~/projects/machines-ui' },
				{ kind: 'output', text: '' },
				{ kind: 'prompt', text: 'pnpm dev' },
				{ kind: 'output', text: '  VITE v5 ready in 312ms' },
				{ kind: 'output', text: '  ➜  Local:   http://localhost:5173/' },
				{ kind: 'output', text: '  ➜  Network: http://192.168.1.10:5173/' }
			]}
		/>
	</Example>
</MachineDoc>
