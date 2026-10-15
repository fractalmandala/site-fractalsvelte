import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CustomFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import { og } from './tokens';

// Static instances built by scripts/build-fonts.py (satori reads TTF/OTF, not variable fonts).
// Share images are prerendered, so these are read once, at build time, from the
// app root (the bundled module no longer sits next to og/fonts).
const file = (name: string) => () => readFile(join(process.cwd(), 'og/fonts', name));

let fonts: ReturnType<typeof resolveFonts> | undefined;

export function ogFonts() {
	fonts ??= resolveFonts([
		new CustomFont(og.sans, file('GoogleSansFlex-400.ttf'), { weight: 400 }),
		new CustomFont(og.sans, file('GoogleSansFlex-700.ttf'), { weight: 700 }),
		new CustomFont(og.sans, file('GoogleSansFlex-800.ttf'), { weight: 800 }),
		new CustomFont(og.mono, file('GoogleSansCode-500.ttf'), { weight: 500 })
	]);
	return fonts;
}
