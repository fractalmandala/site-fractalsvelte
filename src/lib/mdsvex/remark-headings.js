// mdsvex remark plugin: drops the h1 (pages carry their own title), gives every
// heading a GitHub-style id so in-document anchors keep working, and exposes the
// h2/h3 outline as `metadata.toc` for the "On this page" rail.

/** @typedef {{ type: string; depth?: number; value?: string; children?: MdNode[]; data?: Record<string, any> }} MdNode */
/** @typedef {{ depth: number; id: string; text: string }} TocEntry */

/** @param {MdNode} node @returns {string} */
const textOf = (node) => node.value ?? (node.children ?? []).map(textOf).join('');

export function remarkHeadings() {
	/** @param {MdNode} tree @param {{ data: { fm?: Record<string, unknown> } }} file */
	return (tree, file) => {
		/** @type {Map<string, number>} */
		const seen = new Map();
		/** @type {TocEntry[]} */
		const toc = [];

		/** @param {string} text */
		const slug = (text) => {
			const base = text
				.toLowerCase()
				.trim()
				.replace(/[^\p{L}\p{N}\s_-]/gu, '')
				.replace(/\s/g, '-');
			const n = seen.get(base) ?? 0;
			seen.set(base, n + 1);
			return n ? `${base}-${n}` : base;
		};

		/** @param {MdNode} node */
		const walk = (node) => {
			if (!node.children) return;
			node.children = node.children.filter(
				(child) => !(child.type === 'heading' && child.depth === 1)
			);
			for (const child of node.children) {
				if (child.type !== 'heading') {
					walk(child);
					continue;
				}
				const text = textOf(child).trim();
				const id = slug(text);
				child.data = { ...child.data, hProperties: { ...child.data?.hProperties, id } };
				if (child.depth && child.depth <= 3) toc.push({ depth: child.depth, id, text });
			}
		};
		walk(tree);

		file.data.fm = { ...file.data.fm, toc };
	};
}
