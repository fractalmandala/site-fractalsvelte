import { SITE_NAME } from '#lib/seo.js';

export const prerender = true;

export const GET = () =>
	new Response(
		JSON.stringify({
			name: SITE_NAME,
			short_name: SITE_NAME,
			description: 'Svelte 5 and SvelteKit packages: components, styling and syntax highlighting.',
			start_url: '/',
			display: 'standalone',
			background_color: '#FFFFFF',
			theme_color: '#FF3E00',
			icons: [
				{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
				{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
			]
		}),
		{ headers: { 'Content-Type': 'application/manifest+json' } }
	);
