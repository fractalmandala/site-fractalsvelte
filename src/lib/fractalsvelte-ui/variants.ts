// Builds the Tier 2 variants matrix for a fractalsvelte-ui component from its
// extracted props: one live mount per union value (variant, size, shape, ...)
// plus one per boolean state (disabled, loading). Required sample props are
// merged into every mount; the code chip shows only the varied prop.
import type { DocProp } from '#lib/docs/model.js';
import { samplePropsFor } from './samples.js';

export type VariantMount = {
	key: string;
	props: Record<string, unknown>;
	code: string;
};

export type VariantGroup = {
	id: string;
	title: string;
	items: VariantMount[];
};

const STATE_PROPS = ['disabled', 'loading'];

function mountCode(
	name: string,
	varied: Record<string, unknown>,
	label: string,
	hasKids: boolean
): string {
	const attrs = Object.entries(varied)
		.map(([k, v]) =>
			typeof v === 'string' ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`
		)
		.join(' ');
	const open = attrs ? `<${name} ${attrs}` : `<${name}`;
	return hasKids ? `${open}>${label}</${name}>` : `${open} />`;
}

export function variantGroups(component: {
	name: string;
	displayName: string;
	props: DocProp[];
	snippets: DocProp[];
}): VariantGroup[] {
	const base = samplePropsFor(component.name);
	const hasKids = component.snippets.some((s) => s.name === 'children');
	const groups: VariantGroup[] = [];

	for (const p of component.props) {
		if (!p.values || p.values.length < 2) continue;
		groups.push({
			id: p.name,
			title: p.name,
			items: p.values.map((v) => ({
				key: `${p.name}-${v}`,
				props: { ...base, [p.name]: v },
				code: mountCode(component.name, { [p.name]: v }, component.displayName, hasKids)
			}))
		});
	}

	const states = component.props.filter(
		(p) => STATE_PROPS.includes(p.name) && p.type === 'boolean'
	);
	if (states.length) {
		groups.push({
			id: 'states',
			title: 'States',
			items: states.map((p) => ({
				key: p.name,
				props: { ...base, [p.name]: true },
				code: mountCode(component.name, { [p.name]: true }, component.displayName, hasKids)
			}))
		});
	}

	return groups;
}
