<script lang="ts">
	import { Button, CommandPalette, Kbd } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let commandPaletteOpen = $state(false);
	const commandPaletteGroups = [
		{
			category: 'Navigation',
			items: [
				{ id: 'home', label: 'Go to Overview', description: 'Return to home landing page', shortcut: 'G H' },
				{ id: 'btn', label: 'View Button Component', description: 'Actions category', shortcut: 'G B' },
				{ id: 'cards', label: 'Explore 3D Tilt Card', description: 'Motion category', shortcut: 'G C' }
			]
		},
		{
			category: 'Theme & Appearance',
			items: [
				{ id: 'dark', label: 'Toggle Light / Dark Mode', description: 'Switch active color scheme', shortcut: '⌘D' },
				{ id: 'pro', label: 'Switch to Pro UI Theme', description: 'Linear-inspired dark aesthetic', shortcut: 'T P' },
				{ id: 'beui', label: 'Switch to BeUI Theme', description: 'Vibrant modern aesthetic', shortcut: 'T B' }
			]
		},
		{
			category: 'Documentation',
			items: [
				{ id: 'ast', label: 'Inspect AST manifest', description: 'Every component, prop and snippet' },
				{ id: 'tokens', label: 'Open Design Tokens CSS', description: 'View --f-* token dictionary' }
			]
		}
	];
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<div class="box xcenter gap-bs">
		<Button variant="primary" size="lg" onclick={() => commandPaletteOpen = true}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
			Open Command Palette (⌘K)
		</Button>
		<p class="text-body-sm text-muted">
			Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> anywhere or click the button above to launch.
		</p>
		<CommandPalette
			bind:open={commandPaletteOpen}
			groups={commandPaletteGroups}
			placeholder="Type a command or search components..."
			onselect={() => commandPaletteOpen = false}
		/>
	</div>
</ComponentDoc>
