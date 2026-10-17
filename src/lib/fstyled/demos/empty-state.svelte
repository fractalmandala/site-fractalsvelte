<script lang="ts">
	import { EmptyState, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<EmptyState title="No projects yet" description="Create your first project to get started.">
	{#snippet action()}
		<Button>New project</Button>
		<Button variant="ghost">Import</Button>
	{/snippet}
</EmptyState>
