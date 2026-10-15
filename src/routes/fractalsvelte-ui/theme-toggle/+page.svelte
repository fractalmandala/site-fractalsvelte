<script lang="ts">
	import { Button, ThemeToggle } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box xcenter gap-md">
		<ThemeToggle />
		<div class="row ycenter gap-sm">
			<Button variant="primary">Primary</Button>
			<Button variant="soft">Soft</Button>
		</div>
		<p class="text-body-sm text-muted ta-c">
			Switches <code>data-theme</code> and <code>data-theme-style</code> on &lt;html&gt; and
			remembers the choice. On this site the header's moon button sets the mode for you.
		</p>
	</div>
</ComponentDoc>
