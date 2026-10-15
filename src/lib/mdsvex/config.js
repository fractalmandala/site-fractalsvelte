import { fileURLToPath } from 'node:url';
import { highlighter } from './highlighter.js';
import { remarkHeadings } from './remark-headings.js';

/**
 * mdsvex options shared by the Vite config.
 * @type {import('mdsvex').MdsvexOptions}
 */
export const mdsvexOptions = {
	extensions: ['.md'],
	layout: fileURLToPath(new URL('./DocLayout.svelte', import.meta.url)),
	layoutPropForwarding: 'runes',
	highlight: { highlighter },
	remarkPlugins: [remarkHeadings],
	smartypants: { quotes: true, ellipses: true, backticks: false, dashes: 'oldschool' }
};
