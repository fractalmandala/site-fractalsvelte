import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { mdsvexOptions } from './src/lib/mdsvex/config.js';

export default defineConfig({
	plugins: [
		sveltekit({
			// Package docs are markdown, compiled by mdsvex (highlighted by fractalpop).
			extensions: ['.svelte', '.md'],
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				// mdsvex still emits <script context="module"> for frontmatter; nothing to fix on our side
				warningFilter: (w) =>
					!(w.code === 'script_context_deprecated' && w.filename?.endsWith('.md'))
			},

			adapter: adapter()
		}),
		// share images and icons are rendered at build time by sveltekit-og (satori + resvg)
		sveltekitOG()
	]
});
