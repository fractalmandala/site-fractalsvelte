<script lang="ts">
	import { GraphBoot } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphBoot
		title="DEPLOY"
		steps={[
			{ label: 'compose up', eta: '~1.2s' },
			{ label: 'migrate', eta: '~0.6s' },
			{ label: 'seed', eta: '~0.4s' },
			{ label: 'healthcheck' },
			{ label: 'release', eta: '~0.8s' }
		]}
	/>
</Example>
