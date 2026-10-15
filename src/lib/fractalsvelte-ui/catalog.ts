// The live documentation for @fractaldesign/fractalsvelte-ui. Every component has its
// own page at src/routes/fractalsvelte-ui/<slug>/+page.svelte, whose live demo is
// also printed as the usage example, so the two can never disagree.

export const PACKAGE = '@fractaldesign/fractalsvelte-ui';
export const BASE = '/fractalsvelte-ui';

/** Catalogue order and headings */
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

/** IconButton → icon-button, Card3D → card-3d: the page's folder name */
export const slug = (name: string) => name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
