import { defineParams } from '@sveltejs/kit/params';

// SvelteKit loads this file with plain Node (no Vite aliases), so the icon names
// are listed here rather than imported from #lib/icons — keep the two in step.
const ICON = /^(favicon|apple-touch-icon|icon-192|icon-512)\.png$/;

export const params = defineParams({
	// keeps /[icon] from shadowing the one-segment package pages
	icon: (param) => (ICON.test(param) ? param : undefined)
});
