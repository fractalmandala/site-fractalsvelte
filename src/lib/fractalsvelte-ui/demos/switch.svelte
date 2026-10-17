<script lang="ts">
	import { Switch } from '@fractaldesign/fractalsvelte-ui';

	let switchChecked = $state(true);
</script>

<div class="row ycenter gap-xl">
	<Switch bind:checked={switchChecked} label="Dark Mode Sync" />
	<Switch size="sm" checked label="Compact Switch" />
	<Switch disabled label="Disabled Switch" />
</div>
