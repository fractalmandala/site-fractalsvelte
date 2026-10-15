import { llmsIndex } from '#lib/server/llms.js';

export const prerender = true;

export const GET = () =>
	new Response(llmsIndex(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
