<script lang="ts">
	import { Badge, Button, RouteTransition } from '@fractaldesign/fractalsvelte-ui';

	type Type = 'drill' | 'sheet' | 'zoom' | 'fade';

	let screen = $state(1);
	let type = $state<Type>('drill');
	const types: Type[] = ['drill', 'sheet', 'zoom', 'fade'];
</script>

<div class="box gap-md fs-measure-lg">
	<div class="row ycenter xcenter gap-sm wrap">
		{#each types as t (t)}
			<Button size="sm" variant={type === t ? 'primary' : 'outline'} onclick={() => (type = t)}>
				{t}
			</Button>
		{/each}
	</div>

	<div class="wfull fs-stage-sm border radius-lg bg-surface shadow-lg">
		<RouteTransition key={screen} {type}>
			{#if screen === 1}
				<div class="box ybetween gap-md pad-lg hfull">
					<div class="box gap-xs">
						<div class="row"><Badge variant="primary">Screen 1</Badge></div>
						<h4 class="card-title text-primary">Analytics</h4>
						<p class="text-body-sm text-muted">Real-time performance metrics and event logs.</p>
					</div>
					<div class="row">
						<Button size="sm" variant="primary" onclick={() => (screen = 2)}>Next screen →</Button>
					</div>
				</div>
			{:else if screen === 2}
				<div class="box ybetween gap-md pad-lg hfull bg-raised">
					<div class="box gap-xs">
						<div class="row"><Badge variant="success">Screen 2</Badge></div>
						<h4 class="card-title text-primary">Transaction details</h4>
						<p class="text-body-sm text-muted">Settlement and audit logs.</p>
					</div>
					<div class="row gap-sm">
						<Button size="sm" variant="outline" onclick={() => (screen = 1)}>← Back</Button>
						<Button size="sm" variant="primary" onclick={() => (screen = 3)}>Configure →</Button>
					</div>
				</div>
			{:else}
				<div class="box ybetween gap-md pad-lg hfull">
					<div class="box gap-xs">
						<div class="row"><Badge variant="warning">Screen 3</Badge></div>
						<h4 class="card-title text-primary">Security settings</h4>
						<p class="text-body-sm text-muted">Hardware keys and session limits.</p>
					</div>
					<div class="row">
						<Button size="sm" variant="outline" onclick={() => (screen = 1)}>← Start over</Button>
					</div>
				</div>
			{/if}
		</RouteTransition>
	</div>
</div>
