<script lang="ts">
	import { Button, MobileNav } from '@fractaldesign/fractalsvelte-ui';

	let mobileNavOpen = $state(false);
</script>

<div class="box xcenter gap-bs">
	<Button variant="primary" onclick={() => (mobileNavOpen = true)}>Open mobile menu</Button>
	<MobileNav bind:open={mobileNavOpen} title="Navigation">
		<div class="box gap-sm pad-bs">
			<a href="#preview" class="link-plain text-theme weight-600">Preview</a>
			<a href="#usage" class="link-plain text-primary">Usage</a>
			<a href="#props" class="link-plain text-primary">Props</a>
			<a href="#source" class="link-plain text-primary">Source</a>
		</div>
	</MobileNav>
</div>
