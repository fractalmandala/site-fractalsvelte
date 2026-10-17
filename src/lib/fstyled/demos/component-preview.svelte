<script lang="ts">
	import { ComponentPreview, Button, Badge } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<ComponentPreview
	title="Button"
	description="Primary call to action."
	code={'<Button>Save</Button>'}
	class="wfull"
>
	<Button>Save</Button>
	<Button variant="outline">Cancel</Button>
	{#snippet controls()}<Badge variant="surface">controls snippet</Badge>{/snippet}
</ComponentPreview>
