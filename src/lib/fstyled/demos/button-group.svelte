<script lang="ts">
	import { ButtonGroup, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ycenter xcenter gap-lg wrap">
	<ButtonGroup>
		<Button variant="secondary" size="lg">Day</Button>
		<Button variant="secondary" size="lg">Week</Button>
		<Button variant="secondary" size="lg">Month</Button>
	</ButtonGroup>
	<ButtonGroup orientation="vertical">
		<Button variant="outline">Top</Button>
		<Button variant="outline">Middle</Button>
		<Button variant="outline">Bottom</Button>
	</ButtonGroup>
	<ButtonGroup attached={false}>
		<Button variant="ghost">Cut</Button>
		<Button variant="ghost">Copy</Button>
		<Button variant="ghost">Paste</Button>
	</ButtonGroup>
</div>
