/** Icons generated at build time (see routes/[icon=icon]), with their pixel sizes. */
export const ICONS = {
	'favicon.png': 48,
	'apple-touch-icon.png': 180,
	'icon-192.png': 192,
	'icon-512.png': 512
} as const;

export type IconFile = keyof typeof ICONS;
