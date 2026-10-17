// The sections a component page renders, in order. Used by the page load to build
// the right-rail TOC and by DocPage to render — one list, so the two cannot drift.
import type { ResolvedComponent } from './model.js';

export type DocSection = { id: string; text: string };

/** What the page actually has to show, when it differs from the component data. */
export type SectionFlags = { usage?: boolean; examples?: boolean };

export function componentSections(c: ResolvedComponent, flags: SectionFlags = {}): DocSection[] {
	const usage = flags.usage ?? true;
	const examples = flags.examples ?? c.examples.length > 0;
	const sections: (DocSection | false)[] = [
		!!c.importSnippet && { id: 'import', text: 'Import' },
		c.hasPreview && { id: 'preview', text: 'Preview' },
		usage && { id: 'usage', text: 'Usage' },
		examples && { id: 'examples', text: 'Library examples' },
		c.props.some((p) => Boolean(p.values?.length)) && { id: 'variants', text: 'Variants' },
		c.props.length > 0 && { id: 'props', text: 'Props' },
		c.snippets.length > 0 && { id: 'snippets', text: 'Snippets & callbacks' },
		c.slots.length > 0 && { id: 'slots', text: 'Slots' },
		c.types.length > 0 && { id: 'types', text: 'Exported types' },
		c.tokens.length > 0 && { id: 'theming', text: 'Theming tokens' },
		c.classes.length > 0 && { id: 'classes', text: 'CSS classes' },
		Object.keys(c.renames).length > 0 && { id: 'renames', text: 'Renamed props' },
		!!c.motion && { id: 'behaviour', text: 'Behaviour' },
		(c.uses.length > 0 || c.usedBy.length > 0) && { id: 'related', text: 'Related' },
		!!c.source && { id: 'source', text: 'Source' }
	];
	return sections.filter((s): s is DocSection => !!s);
}
