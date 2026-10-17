<script lang="ts">
	import {
		Badge,
		BentoCell,
		BentoGrid,
		Progress,
		Sparkline,
		Switch
	} from '@fractaldesign/fractalsvelte-ui';

	let autoSync = $state(true);
</script>

<div class="fs-measure-lg">
	<BentoGrid columns={3} gap="md">
		<BentoCell colSpan={2} variant="surface" glow>
			<div class="box gap-sm">
				<div class="row ycenter xbetween gap-sm">
					<span class="fs-eyebrow text-body-sm weight-700 text-theme">Core engine</span>
					<Badge variant="primary" dot>Production</Badge>
				</div>
				<h3 class="page-heading-bs text-primary">Throughput</h3>
				<p class="text-body-sm text-muted lh15">This cell spans two columns and glows on hover.</p>
				<div class="row ycenter gap-bs">
					<Sparkline data={[12, 19, 25, 22, 38, 45, 60, 58, 75]} width={160} height={36} />
					<span class="text-body-sm weight-600 text-success">+38.2%</span>
				</div>
			</div>
		</BentoCell>

		<BentoCell variant="raised">
			<div class="box ybetween gap-md hfull">
				<div class="box gap-xs">
					<span class="text-body-sm text-muted">Components</span>
					<span class="page-heading-xl text-primary lh11">124</span>
				</div>
				<Progress value={85} size="sm" />
			</div>
		</BentoCell>

		<BentoCell variant="sunken">
			<div class="box gap-sm">
				<h4 class="card-title text-primary">Auto-sync</h4>
				<p class="text-body-sm text-muted">Push changes as you type.</p>
				<Switch bind:checked={autoSync} size="sm" label={autoSync ? 'On' : 'Off'} />
			</div>
		</BentoCell>

		<BentoCell colSpan={2} variant="surface">
			<div class="row ycenter xbetween gap-bs">
				<div class="box gap-xs">
					<h4 class="card-title text-primary">Themes</h4>
					<p class="text-body-sm text-muted">Fractal, Pro, BeUI, Halaska and Cyber.</p>
				</div>
				<Badge variant="outline">5 styles</Badge>
			</div>
		</BentoCell>
	</BentoGrid>
</div>
