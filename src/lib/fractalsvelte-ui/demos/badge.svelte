<script lang="ts">
	import { Badge } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="box gap-md wfull">
	<p class="fs-eyebrow text-body-sm weight-600 text-muted">Variants Matrix</p>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Badge variant="primary" dot>Primary</Badge>
		<Badge variant="success" dot>Success</Badge>
		<Badge variant="warning" dot>Warning</Badge>
		<Badge variant="danger" dot>Danger</Badge>
		<Badge variant="info" dot>Info</Badge>
		<Badge variant="surface">Surface</Badge>
		<Badge variant="outline">Outline</Badge>
	</div>
	<p class="fs-eyebrow text-body-sm weight-600 text-muted">Sizes</p>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Badge size="sm">Small</Badge>
		<Badge size="md">Medium</Badge>
		<Badge size="lg">Large</Badge>
	</div>
</div>
