import { groups } from '#lib/server/machines-ui.js';
import type { LayoutServerLoad } from './$types';

// The left rail's component list: names and links only.
export const load: LayoutServerLoad = () => ({
	nav: groups.map(({ id, label, components }) => ({
		id,
		label,
		links: components.map(({ name, slug }) => ({ name, slug }))
	}))
});
