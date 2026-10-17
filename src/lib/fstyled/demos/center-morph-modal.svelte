<script lang="ts">
	import { CenterMorphModal, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<CenterMorphModal title="Center modal" description="Opens in a native modal dialog.">
	{#snippet children({ close })}
		<p class="text-body-sm text-secondary">Close it from inside with the snippet's close().</p>
		<Button onclick={close}>Done</Button>
	{/snippet}
</CenterMorphModal>
