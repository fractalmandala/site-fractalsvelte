<script lang="ts">
	import { Collapsible } from '@fractaldesign/fractalsvelte-ui/styler';

	let open = $state(true);
</script>

<div class="box gap-sm wfull">
	<Collapsible bind:open title="What is closed-world styling?">
		<p class="text-body-sm">Every class must exist in the compiled stylesheet. No ad-hoc CSS.</p>
	</Collapsible>
	<Collapsible title="Disabled" disabled />
	<p class="text-body-sm text-secondary">First item is {open ? 'open' : 'closed'}.</p>
</div>
