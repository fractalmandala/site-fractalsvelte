<script lang="ts">
	import { Button, Tooltip } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="row ycenter xcenter gap-sm wrap wfull">
	<Tooltip content="Helpful contextual tooltip" placement="top">
		<Button variant="secondary">Hover Top</Button>
	</Tooltip>
	<Tooltip content="Bottom positioned tooltip" placement="bottom">
		<Button variant="outline">Hover Bottom</Button>
	</Tooltip>
</div>
