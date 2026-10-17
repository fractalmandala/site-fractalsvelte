<script lang="ts">
	import { TopNav } from '@fractaldesign/fractalsvelte-ui/styler';

	let activeId = $state('overview');
	const items = [
		{ id: 'overview', label: 'Overview', href: '#preview' },
		{ id: 'docs', label: 'Docs', href: '#preview' },
		{ id: 'pricing', label: 'Pricing', href: '#preview', badge: 'new' }
	];
</script>

<div class="box gap-md xcenter">
	<TopNav bind:activeId {items} />
	<TopNav variant="pills" {items} activeId="docs" />
	<TopNav variant="subtle" uppercase {items} activeId="pricing" />
</div>
