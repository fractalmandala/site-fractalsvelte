// The live documentation for @fractaldesign/machines-ui. Every component has its own
// page at src/routes/machines-ui/<slug>/+page.svelte, made of <Example> blocks: each
// renders live and prints its own markup, so the two can never disagree.

export const PACKAGE = '@fractaldesign/machines-ui';
export const BASE = '/machines-ui';

/** Catalogue order and headings, as in the library's own docs */
export const families = [
	{ id: 'frame', label: 'Frame' },
	{ id: 'graphs', label: 'Graphs' },
	{ id: 'animated', label: 'Animated' },
	{ id: 'diagram', label: 'Diagram' },
	{ id: 'flow', label: 'Flow' }
] as const;

/** Shared by MachineDoc and each Example: hands out example i's code in render order. */
export const EXAMPLES = Symbol('machines-ui examples');
export type CodeSample = { code: string; html: string };
export type ExampleContext = { samples: CodeSample[]; next: number };
