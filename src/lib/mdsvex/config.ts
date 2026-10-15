import { fileURLToPath } from 'node:url';
import type { MdsvexOptions } from 'mdsvex';
import { highlighter } from './highlighter.js';
import { remarkHeadings } from './remark-headings.js';

/** mdsvex options shared by the Vite config. */
export const mdsvexOptions: MdsvexOptions = {
	extensions: ['.md'],
	layout: fileURLToPath(new URL('./DocLayout.svelte', import.meta.url)),
	layoutPropForwarding: 'runes',
	highlight: { highlighter },
	remarkPlugins: [remarkHeadings],
	smartypants: { quotes: true, ellipses: true, backticks: false, dashes: 'oldschool' }
};
