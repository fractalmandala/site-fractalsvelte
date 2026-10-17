<script lang="ts">
	import { AppShell, Button } from '@fractaldesign/fractalsvelte-ui/styler';

	let sidebarOpen = $state(false);
</script>

<!-- AppShell is a full-page frame (min-height 100vh), so the demo scrolls inside a box. -->
<div class="wfull frame-4-3 border radius-md">
	<div class="full scroll-y">
		<AppShell bind:sidebarOpen>
			{#snippet header()}
				<span class="page-heading-bs">Fractal</span>
				<Button
					variant="ghost"
					size="md"
					class="hide-desktop"
					onclick={() => (sidebarOpen = !sidebarOpen)}>Menu</Button
				>
			{/snippet}
			{#snippet sidebar()}
				<a class="nav-link" href="#preview">Overview</a>
				<a class="nav-link" href="#usage">Usage</a>
			{/snippet}
			<div class="pad-lg box gap-sm">
				<h3 class="page-heading-lg">Main section</h3>
				<p class="text-body text-secondary">
					The header sticks inside this scroll box; the left rail appears at wide widths.
				</p>
			</div>
			{#snippet footer()}© Fractal{/snippet}
		</AppShell>
	</div>
</div>
