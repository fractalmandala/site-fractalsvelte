<script lang="ts">
	import { Spinner } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ycenter xcenter gap-lg wrap">
	<Spinner size="sm" />
	<Spinner size="bs" tone="theme" />
	<Spinner size="xl" tone="info" />
	<Spinner size="3xl" tone="success" duration={1.4} />
</div>
