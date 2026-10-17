// Catalogue order for the fractalsvelte-ui and fstyled docs. The live docs
// themselves live in src/lib/fractalsvelte-ui/demos/ and src/lib/fstyled/demos/,
// described by the registry in src/lib/server/docs/registry.ts.
export const categories = [
	{ id: 'actions', label: 'Actions & buttons' },
	{ id: 'forms', label: 'Forms & inputs' },
	{ id: 'display', label: 'Data display' },
	{ id: 'layout', label: 'Layout & bento' },
	{ id: 'navigation', label: 'Navigation & shells' },
	{ id: 'overlays', label: 'Overlays & dialogs' },
	{ id: 'typography', label: 'Typography & code' },
	{ id: 'motion', label: 'Motion & animation' },
	{ id: 'blocks', label: 'UI blocks' },
	{ id: 'doc', label: 'Documentation helpers' }
] as const;
