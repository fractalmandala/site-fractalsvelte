<script lang="ts">
	// Mirrors the scale tokens scoped to .scale-showcase below.
	const typeScale = [
		{ name: 'xs', value: '0.67rem', sample: 'The quick brown fox' },
		{ name: 'sm', value: '0.75rem', sample: 'The quick brown fox' },
		{
			name: 'md',
			value: 'clamp(0.8333rem, 0.829rem + 0.0193vw, 0.844rem)',
			sample: 'The quick brown fox'
		},
		{
			name: 'bs',
			value: 'clamp(1rem, 0.9489rem + 0.2273vw, 1.125rem)',
			sample: 'The quick brown fox'
		},
		{
			name: 'lg',
			value: 'clamp(1.2rem, 1.0774rem + 0.5448vw, 1.4996rem)',
			sample: 'The quick brown fox'
		},
		{
			name: 'xl',
			value: 'clamp(1.44rem, 1.2113rem + 1.0164vw, 1.999rem)',
			sample: 'The quick brown fox'
		},
		{
			name: '2xl',
			value: 'clamp(1.728rem, 1.3448rem + 1.703vw, 2.6647rem)',
			sample: 'Fractal'
		},
		{
			name: '3xl',
			value: 'clamp(2.0736rem, 1.4688rem + 2.688vw, 3.552rem)',
			sample: 'Fractal'
		},
		{
			name: '4xl',
			value: 'clamp(2.4883rem, 1.5693rem + 4.0845vw, 4.7348rem)',
			sample: 'Aa'
		},
		{
			name: '5xl',
			value: 'clamp(2.986rem, 1.6255rem + 6.0464vw, 6.3115rem)',
			sample: 'Aa'
		}
	];

	// xs, sm and md share one row; the rest stack as a list.
	const typeTrio = typeScale.slice(0, 3);
	const typeRest = typeScale.slice(3);

	const spaceScale = [
		{ name: 'xs', units: 1, expr: 'var(--unit-space)' },
		{ name: 'sm', units: 2, expr: 'calc(var(--unit-space) * 2)' },
		{ name: 'md', units: 3, expr: 'calc(var(--unit-space) * 3)' },
		{ name: 'bs', units: 4, expr: 'calc(var(--unit-space) * 4)' },
		{ name: 'lg', units: 6, expr: 'calc(var(--unit-space) * 6)' },
		{ name: 'xl', units: 8, expr: 'calc(var(--unit-space) * 8)' },
		{ name: '2xl', units: 12, expr: 'calc(var(--unit-space) * 12)' },
		{ name: '3xl', units: 16, expr: 'calc(var(--unit-space) * 16)' }
	];

	const radiusScale = [
		{ name: 'xs', value: '2px' },
		{ name: 'sm', value: '4px' },
		{ name: 'md', value: '8px' },
		{ name: 'bs', value: '16px' },
		{ name: 'lg', value: '32px' },
		{ name: 'full', value: '9999px' }
	];

	// --height-xl is written as a bare 40 in the spec; read as 40px here.
	const heightScale = [
		{ name: 'sm', value: '20px' },
		{ name: 'md', value: '24px' },
		{ name: 'bs', value: '28px' },
		{ name: 'lg', value: '32px' },
		{ name: 'xl', value: '40px' }
	];

	const motions = [
		{ name: 'in1', kind: 'in', dur: '50ms', curve: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)', pts: [0.47, 0, 0.745, 0.715] },
		{ name: 'in2', kind: 'in', dur: '140ms', curve: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)', pts: [0.55, 0.055, 0.675, 0.19] },
		{ name: 'in3', kind: 'in', dur: '220ms', curve: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)', pts: [0.755, 0.05, 0.855, 0.06] },
		{ name: 'out1', kind: 'out', dur: '90ms', curve: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)', pts: [0.39, 0.575, 0.565, 1] },
		{ name: 'out2', kind: 'out', dur: '140ms', curve: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)', pts: [0.215, 0.61, 0.355, 1] },
		{ name: 'out3', kind: 'out', dur: '220ms', curve: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)', pts: [0.23, 1, 0.32, 1] }
	];

	let runs = $state<Record<string, boolean>>(
		Object.fromEntries(motions.map((m) => [m.name, false]))
	);

	function setAll(value: boolean) {
		for (const m of motions) runs[m.name] = value;
	}

	// Draws the easing as a path from (0,100) to (100,0) in the SVG's space.
	function curvePath(p: number[]) {
		return `M0,100 C${p[0] * 100},${100 - p[1] * 100} ${p[2] * 100},${100 - p[3] * 100} 100,0`;
	}
</script>

<section class="main-section">
	<section class="content-section narrow-wide">
		<header class="page-header">
			<h1 class="page-title ls-tight-xl">Fractal<span class="text-theme">styler</span></h1>
			<p class="page-desc text-secondary lh15">
				Lean custom styling system written and used in SASS.
			</p>
		</header>
		<article class="box sitedocs gap-xl">
			<div class="box gap-sm pb-lg prose-left">
				<p class="text-body lh16">
					Fractalstyler is a system built around the idea that all styling can be composed as a
					combination of "fractals" - unitary classes and styling definitions that configure into
					higher layers retaining the same modularity. It is inspired by responsive styling at <a
						class="link"
						href="https://utopia.fyi/"
						target="_blank"
						rel="noreferrer">Utopia</a
					>
					and by
					<a class="link" href="https://every-layout.dev/" target="_blank" rel="noreferrer"
						>Every Layout</a
					>. But before we get into the good stuff, you are most likely asking the obvious:
				</p>
				<blockquote>
					<b>Why Another Styling System?</b>
				</blockquote>
				<ol>
					<li class="text-body lh16">
						I dont' enjoy using Tailwind. And alternatives like StyleX, Bulma or Web Awesome don't
						do what I want my styling system to do.
					</li>
					<li class="text-body lg16">
						As long as there's a token system, theme compatibility isn't a problem.
					</li>
					<li>It's fun!</li>
				</ol>
				<div class="row ycenter gap-bs">
					<a
						href="/fractalstyler/docs/tokens"
						class="btn tt-u weight-500"
						data-variant="primary"
						data-shape="square">DOCS</a
					>
                    <a href="https://www.npmjs.com/package/@fractaldesign/fractalstyler" target="_blank" rel="noreferrer" class="btn tt-u weight-500" data-variant="outline">NPM</a>
				</div>
			</div>

			<div class="box gap-xl pt-lg scale-showcase">
				<section class="box gap-md">
					<header class="scale-head">
						<span class="scale-eyebrow">Typography</span>
						<span class="text-muted text-xs">Fluid · clamp()</span>
					</header>
					<ul class="type-trio">
						{#each typeTrio as t (t.name)}
							<li class="type-card bg-surface">
								<div class="type-meta">
									<code class="token">--text-{t.name}</code>
									<span class="text-muted text-xs token-value">{t.value}</span>
								</div>
								<p class="type-sample" style:font-size={`var(--text-${t.name})`}>{t.sample}</p>
							</li>
						{/each}
					</ul>
					<ol class="type-list">
						{#each typeRest as t (t.name)}
							<li class="type-row">
								<div class="type-meta">
									<code class="token">--text-{t.name}</code>
									<span class="text-muted text-xs token-value">{t.value}</span>
								</div>
								<p class="type-sample" style:font-size={`var(--text-${t.name})`}>{t.sample}</p>
							</li>
						{/each}
					</ol>
				</section>

				<section class="box gap-md">
					<header class="scale-head">
						<span class="scale-eyebrow">Space</span>
						<span class="text-muted text-xs">1 unit = 0.25rem</span>
					</header>
					<div class="grid-2 gap-lg">
						<ol class="space-list">
							{#each spaceScale as s (s.name)}
								<li class="space-row">
									<div class="type-meta">
										<code class="token">--space-{s.name}</code>
										<span class="text-muted text-xs token-value"
											>{s.units} unit{s.units > 1 ? 's' : ''} · {s.expr}</span
										>
									</div>
									<div class="space-bar-wrap">
										<div class="space-bar" style:width={`var(--space-${s.name})`}></div>
									</div>
								</li>
							{/each}
						</ol>

						<div class="stairs-col">
							<div class="graph">
								<header class="scale-head">
									<span class="scale-eyebrow">Space graph</span>
									<span class="text-muted text-xs">nested squares</span>
								</header>
								<div class="stairs" aria-label="Space tokens as nested squares">
									{#each spaceScale as s (s.name)}
										<div class="stair-item">
											<div
												class="stair"
												style:width={`var(--space-${s.name})`}
												style:height={`var(--space-${s.name})`}
											></div>
											<span class="text-muted text-xs">{s.name}</span>
										</div>
									{/each}
								</div>
							</div>

							<div class="graph">
								<header class="scale-head">
									<span class="scale-eyebrow">Radius</span>
									<span class="text-muted text-xs">corner ladder</span>
								</header>
								<div class="radius-row">
									{#each radiusScale as r (r.name)}
										<div class="radius-item">
											<div
												class="radius-tile"
												style:border-radius={`var(--radius-${r.name})`}
											></div>
											<code class="token">--radius-{r.name}</code>
											<span class="text-muted text-xs">{r.value}</span>
										</div>
									{/each}
								</div>
							</div>

							<div class="graph">
								<header class="scale-head">
									<span class="scale-eyebrow">Height</span>
									<span class="text-muted text-xs">bar heights</span>
								</header>
								<div class="height-row">
									{#each heightScale as h (h.name)}
										<div class="height-item">
											<div
												class="height-bar"
												style:height={`var(--height-${h.name})`}
											></div>
											<code class="token">--height-{h.name}</code>
											<span class="text-muted text-xs">{h.value}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section class="box gap-md">
					<header class="scale-head">
						<span class="scale-eyebrow">Motion</span>
						<div class="row ycenter gap-sm">
							<button type="button" class="btn tt-u weight-500" data-variant="primary" data-shape="square" onclick={() => setAll(true)}>Play all</button>
							<button type="button" class="btn tt-u weight-500" data-shape="square" onclick={() => setAll(false)}>Reset</button>
						</div>
					</header>
					<p class="text-muted text-xs">
						Click a track to run it. Dots travel with the easing and duration of their token;
						"in" curves accelerate, "out" curves decelerate.
					</p>
					<div class="grid-3 gap-md">
						{#each motions as m (m.name)}
							<article
								class="motion-card"
								class:on={runs[m.name]}
								style={`--m: var(--motion${m.name})`}
							>
								<div class="type-meta">
									<code class="token">--motion{m.name}</code>
									<span class="text-muted text-xs token-value">
										{m.dur} · {m.kind === 'in' ? 'accelerates' : 'decelerates'}
									</span>
								</div>
								<svg class="curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
									<path d="M0,0 L0,100 L100,100" class="curve-axis" />
									<path d="M0,100 L100,0" class="curve-ref" />
									<path d={curvePath(m.pts)} class="curve-line" />
								</svg>
								<span class="text-muted text-xs token-value">{m.curve}</span>
								<button
									type="button"
									class="track"
									aria-pressed={runs[m.name]}
									aria-label={`Run ${m.name} motion`}
									onclick={() => (runs[m.name] = !runs[m.name])}
								>
									<span class="dot"></span>
								</button>
							</article>
						{/each}
					</div>
				</section>
			</div>
		</article>
	</section>
</section>

<style>
	/* Scoped copy of the scale tokens, so the showcase shows the exact values above. */
	.scale-showcase {
		--text-xs: 0.67rem;
		--text-sm: 0.75rem;
		--text-md: clamp(0.8333rem, 0.829rem + 0.0193vw, 0.844rem);
		--text-bs: clamp(1rem, 0.9489rem + 0.2273vw, 1.125rem);
		--text-lg: clamp(1.2rem, 1.0774rem + 0.5448vw, 1.4996rem);
		--text-xl: clamp(1.44rem, 1.2113rem + 1.0164vw, 1.999rem);
		--text-2xl: clamp(1.728rem, 1.3448rem + 1.703vw, 2.6647rem);
		--text-3xl: clamp(2.0736rem, 1.4688rem + 2.688vw, 3.552rem);
		--text-4xl: clamp(2.4883rem, 1.5693rem + 4.0845vw, 4.7348rem);
		--text-5xl: clamp(2.986rem, 1.6255rem + 6.0464vw, 6.3115rem);

		--unit-space: 0.25rem;
		--space-xs: var(--unit-space);
		--space-sm: calc(var(--unit-space) * 2);
		--space-md: calc(var(--unit-space) * 3);
		--space-bs: calc(var(--unit-space) * 4);
		--space-lg: calc(var(--unit-space) * 6);
		--space-xl: calc(var(--unit-space) * 8);
		--space-2xl: calc(var(--unit-space) * 12);
		--space-3xl: calc(var(--unit-space) * 16);

		--radius-xs: 2px;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-bs: 16px;
		--radius-lg: 32px;
		--radius-full: 9999px;

		--height-sm: 20px;
		--height-md: 24px;
		--height-bs: 28px;
		--height-lg: 32px;
		--height-xl: 40px;

		--transin1: cubic-bezier(0.47, 0, 0.745, 0.715);
		--transin2: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		--transin3: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		--transout1: cubic-bezier(0.39, 0.575, 0.565, 1);
		--transout2: cubic-bezier(0.215, 0.61, 0.355, 1);
		--transout3: cubic-bezier(0.23, 1, 0.32, 1);

		--speed0: 50ms;
		--speed1: 90ms;
		--speed2: 140ms;
		--speed3: 220ms;

		--motionin1: var(--speed0) var(--transin1);
		--motionout1: var(--speed1) var(--transout1);
		--motionin2: var(--speed2) var(--transin2);
		--motionout2: var(--speed2) var(--transout2);
		--motionin3: var(--speed3) var(--transin3);
		--motionout3: var(--speed3) var(--transout3);
	}

	.scale-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid var(--border-subtle);
	}

	.scale-eyebrow {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--theme-color);
	}

	.type-trio {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.type-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-md);
		min-width: 0;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		background: var(--bg-surface);
	}

	.type-list,
	.space-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.type-row,
	.space-row {
		display: grid;
		grid-template-columns: minmax(11rem, 15rem) 1fr;
		align-items: center;
		gap: var(--space-lg);
		padding-block: var(--space-md);
		border-bottom: 1px solid var(--border-subtle);
	}

	.space-row {
		grid-template-columns: minmax(8rem, 11rem) 1fr;
	}

	.type-meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		min-width: 0;
	}

	.token {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--theme-color);
	}

	.token-value {
		overflow-wrap: anywhere;
		line-height: 1.4;
	}

	.type-sample {
		margin: 0;
		line-height: 1.1;
		letter-spacing: -0.01em;
		color: var(--text-primary);
		overflow-wrap: anywhere;
		transition: font-size 0.2s ease;
	}

	.space-bar-wrap {
		display: flex;
		align-items: center;
		min-height: var(--space-md);
	}

	.space-bar {
		height: var(--space-md);
		max-width: 100%;
		border-radius: var(--radius-xs);
		background: linear-gradient(90deg, var(--theme-color), var(--theme-color-alt));
	}

	.stairs-col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--space-xl);
		min-width: 0;
	}

	.graph {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.stairs {
		display: flex;
		align-items: flex-end;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.stair-item,
	.radius-item,
	.height-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
	}

	.stair {
		flex: none;
		border: 1px solid var(--theme-color);
		border-radius: var(--radius-xs);
		background: color-mix(in srgb, var(--theme-color) 18%, transparent);
	}

	.radius-row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: var(--space-md);
	}

	.radius-tile {
		width: 3.5rem;
		height: 3.5rem;
		border: 2px solid var(--theme-color);
		background: color-mix(in srgb, var(--theme-color) 18%, transparent);
	}

	.height-row {
		display: flex;
		align-items: flex-end;
		gap: var(--space-md);
	}

	.height-bar {
		width: 2.5rem;
		border-radius: var(--radius-xs) var(--radius-xs) 0 0;
		background: linear-gradient(180deg, var(--theme-color), var(--theme-color-alt));
	}

	.motion-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		min-width: 0;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		background: var(--bg-surface);
	}

	.curve {
		width: 100%;
		height: 6rem;
		overflow: visible;
	}

	.curve-axis {
		fill: none;
		stroke: var(--border-strong);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
	}

	.curve-ref {
		fill: none;
		stroke: var(--border);
		stroke-dasharray: 4 4;
		vector-effect: non-scaling-stroke;
	}

	.curve-line {
		fill: none;
		stroke: var(--theme-color);
		stroke-width: 2.5;
		vector-effect: non-scaling-stroke;
	}

	.track {
		position: relative;
		width: 100%;
		height: var(--height-md);
		margin-top: auto;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: var(--bg-sunken);
		cursor: pointer;
	}

	.dot {
		position: absolute;
		top: 50%;
		left: 2px;
		width: var(--height-sm);
		height: var(--height-sm);
		border-radius: var(--radius-full);
		background: var(--theme-color);
		transform: translateY(-50%);
		transition: left var(--m);
	}

	.motion-card.on .dot {
		left: calc(100% - var(--height-sm) - 2px);
	}

	.grid-3 > .motion-card {
		min-width: 0;
	}

	@media (max-width: 40rem) {
		.type-trio {
			grid-template-columns: 1fr;
		}

		.type-row,
		.space-row {
			grid-template-columns: 1fr;
			gap: var(--space-xs);
		}
	}
</style>
