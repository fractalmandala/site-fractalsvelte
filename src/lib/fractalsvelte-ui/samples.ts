// Representative props for the fractalsvelte-ui components whose required
// props have no usable default, so the hero and the variants gallery can
// mount them live. Every other component mounts bare (its own defaults) or
// union-driven. Values here are plain data — never eval'd manifest strings.
export const SAMPLE_PROPS: Record<string, Record<string, unknown>> = {
	CodeBlock: { code: 'pnpm add @fractaldesign/fractalsvelte-ui', language: 'bash' },
	ComponentPreview: { title: 'Button' },
	CopyButton: { text: 'pnpm add @fractaldesign/fractalsvelte-ui' },
	DataTable: {
		columns: [
			{ key: 'name', label: 'Name' },
			{ key: 'role', label: 'Role' }
		],
		rows: [
			{ name: 'Amrit', role: 'Design' },
			{ name: 'Svelte', role: 'Framework' }
		]
	},
	EmptyState: {
		title: 'No projects yet',
		description: 'Create your first project to get started.'
	},
	HeroBlock: {
		title: 'Design at the speed of thought',
		description: 'Token-driven Svelte 5 components for SvelteKit.'
	},
	IconButton: { label: 'Close' },
	LinkButton: { href: '#preview' },
	Meter: { value: 65, showValue: true },
	MorphingTabs: {
		items: [
			{ id: 'design', label: 'Design' },
			{ id: 'code', label: 'Code' },
			{ id: 'docs', label: 'Docs' }
		]
	},
	PricingCard: {
		tier: 'Studio',
		price: 24,
		features: ['Unlimited projects', 'Priority support', 'Shared tokens']
	},
	Radio: { value: 'a', label: 'Option A' },
	SharedElement: { name: 'hero-card' },
	StatCard: { title: 'Active users', value: '12,408', delta: '+12%', timeframe: 'vs last week' },
	TextScramble: { text: 'Fractal Design' },
	WorkflowNode: { title: 'Build step', status: 'running' }
};

export function samplePropsFor(name: string): Record<string, unknown> {
	return SAMPLE_PROPS[name] ?? {};
}
