<script lang="ts">
	import { Radio } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="row gap-lg">
	<Radio name="demo_radio" value="opt1" checked label="Option Alpha" />
	<Radio name="demo_radio" value="opt2" label="Option Beta" />
	<Radio name="demo_radio" value="opt3" disabled label="Disabled" />
</div>
