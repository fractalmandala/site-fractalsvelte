<script lang="ts">
	import { AppShell, Badge, Button, SideNav } from '@fractaldesign/fractalsvelte-ui';
	import ComponentDoc from '#lib/fractalsvelte-ui/ComponentDoc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let collapsed = $state(false);
	let active = $state('analytics');
</script>

<ComponentDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<!-- `contained` fills this box instead of the viewport -->
	<div class="fs-measure-lg fs-stage-lg border radius-sm">
		<AppShell contained bind:sidebarCollapsed={collapsed} sidebarWidth="180px" headerHeight="48px">
			{#snippet header()}
				<div class="row ycenter xbetween gap-sm hfull px-bs bb bg-surface">
					<span class="text-body-sm weight-700 text-theme">Acme console</span>
					<Button size="xs" variant="outline" onclick={() => (collapsed = !collapsed)}>
						{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					</Button>
				</div>
			{/snippet}

			{#snippet sidebar({ collapsed })}
				{#if collapsed}
					<div class="box xcenter gap-sm py-md text-body-sm">📊<br />⚙️</div>
				{:else}
					<SideNav
						items={[
							{ id: 'analytics', label: 'Analytics' },
							{ id: 'deploys', label: 'Deploys', badge: '3' },
							{ id: 'settings', label: 'Settings' }
						]}
						bind:activeId={active}
					/>
				{/if}
			{/snippet}

			<div class="box gap-sm pad-lg">
				<div class="row ycenter gap-sm">
					<h4 class="card-title text-primary">{active}</h4>
					<Badge variant="success">Live</Badge>
				</div>
				<p class="text-body-sm text-muted">
					The header stays sticky, the sidebar collapses to a rail, and only this column scrolls.
				</p>
			</div>

			{#snippet footer()}
				<p class="text-body-sm text-muted px-bs py-sm">v2.4.1 · All systems normal</p>
			{/snippet}
		</AppShell>
	</div>
</ComponentDoc>
