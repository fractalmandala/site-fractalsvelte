<script lang="ts">
	import { Switch } from '@fractaldesign/fractalsvelte-ui/styler';

	let notify = $state(true);
</script>

<div class="box gap-md">
	<Switch label="Email notifications" description="Weekly digest only." bind:checked={notify} />
	<Switch label="Danger zone" tone="danger" checked size="lg" />
	<Switch label="Disabled" disabled />
</div>
