<script lang="ts">
	import { Input } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let inputValue = $state('fractal@design.system');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box gap-md wfull fs-measure-md">
		<Input label="Email Address" bind:value={inputValue} placeholder="name@domain.com" helperText="We never share your email." clearable />
		<Input label="Password" type="password" value="secretpass123" />
		<Input label="Invalid Field" value="broken-input" error="Please enter a valid format" />
	</div>
</ComponentDoc>
