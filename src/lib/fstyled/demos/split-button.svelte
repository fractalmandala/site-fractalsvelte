<script lang="ts">
	import { SplitButton } from '@fractaldesign/fractalsvelte-ui/styler';

	let count = $state(0);
	let open = $state(false);
</script>

<div class="box xcenter gap-sm">
	<SplitButton
		size="lg"
		expanded={open}
		onclick={() => (count += 1)}
		ondropdown={() => (open = !open)}
	>
		Publish
	</SplitButton>
	<p class="text-body-sm text-secondary">
		Published {count} times · menu {open ? 'open' : 'closed'}
	</p>
</div>
