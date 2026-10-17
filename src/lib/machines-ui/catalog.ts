// Catalogue order for the machines-ui docs. The live docs themselves live in
// src/lib/machines-ui/demos/ and are described by the registry in
// src/lib/server/docs/registry.ts.
export const families = [
	{ id: 'frame', label: 'Frame' },
	{ id: 'graphs', label: 'Graphs' },
	{ id: 'animated', label: 'Animated' },
	{ id: 'diagram', label: 'Diagram' },
	{ id: 'flow', label: 'Flow' }
] as const;
