<script lang="ts">
	import { Alert } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="box fs-measure-lg gap-md">
	<Alert
		intent="info"
		title="System Synchronization"
		description="All 106 components verified with zero drift."
	/>
	<Alert
		intent="success"
		title="Build Successful"
		description="SvelteKit 3 production SSR build passed cleanly."
	/>
	<Alert
		intent="warning"
		title="Deprecation Notice"
		description="Legacy syntax migrated to Svelte 5 runes."
	/>
	<Alert intent="danger" title="Validation Failed" description="Found 0 errors and 0 warnings." />
</div>
