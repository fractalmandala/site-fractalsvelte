// Share images are rasterised by satori, outside the browser, so they can't read
// CSS custom properties. These mirror the light palette in
// src/lib/styles/_00_tokens.sass — keep the two in step.
export const og = {
	paper: '#FFFFFF',
	ink: '#141414',
	grey: '#6B6B6B',
	muted: '#8A8A8A',
	hair: '#EAEAEA',
	faint: '#BFBFBF',
	sunken: '#F7F7F7',
	theme: '#FF3E00',
	sans: 'Google Sans Flex',
	mono: 'Google Sans Code'
} as const;
