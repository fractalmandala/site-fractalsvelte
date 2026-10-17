<script lang="ts">
	import { Progress } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<Progress label="Uploading" value={45} showValue />
	<Progress label="Striped" value={70} tone="info" size="lg" striped animated />
	<Progress label="Indeterminate" indeterminate tone="warning" />
	<Progress label="Small" value={90} size="sm" tone="success" showValue />
</div>
