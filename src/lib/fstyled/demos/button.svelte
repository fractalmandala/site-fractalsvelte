<script lang="ts">
	import { Button } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luSparkles } from 'fractalicons/lucide';
</script>

<div class="box gap-md xcenter">
	<div class="row ycenter xcenter gap-sm wrap">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="soft">Soft</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="link">Link</Button>
		<Button variant="destructive">Delete</Button>
	</div>
	<div class="row ycenter xcenter gap-sm wrap">
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="bs">Base</Button>
		<Button size="lg" shape="round">Large round</Button>
		<Button size="lg" loading>Saving</Button>
		<Button size="lg" disabled>Disabled</Button>
		<Button size="lg" variant="secondary" href="#preview">
			{#snippet leading()}<Icon icon={luSparkles} />{/snippet}
			Anchor
		</Button>
	</div>
</div>
