<script lang="ts">
	import { Breadcrumb } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md">
	<Breadcrumb
		items={[{ label: 'Home', href: '#' }, { label: 'Library', href: '#' }, { label: 'Breadcrumb' }]}
	/>
	<Breadcrumb
		items={[
			{ label: 'Home', href: '#' },
			{ label: 'Library', href: '#' },
			{ label: 'Styler', href: '#' },
			{ label: 'Navigation', href: '#' },
			{ label: 'Breadcrumb' }
		]}
		maxItems={3}
	/>
</div>
