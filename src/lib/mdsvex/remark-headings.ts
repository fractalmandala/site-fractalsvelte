// mdsvex remark plugin: drops the h1 (pages carry their own title), gives every
// heading a GitHub-style id so in-document anchors keep working, and exposes the
// h2/h3 outline as `metadata.toc` for the "On this page" rail.

type MdNode = {
	type: string;
	depth?: number;
	value?: string;
	children?: MdNode[];
	data?: { hProperties?: Record<string, unknown> } & Record<string, unknown>;
};
type TocEntry = { depth: number; id: string; text: string };
type VFileLike = { data: { fm?: Record<string, unknown> } };

const textOf = (node: MdNode): string => node.value ?? (node.children ?? []).map(textOf).join('');

export function remarkHeadings() {
	return (tree: MdNode, file: VFileLike) => {
		const seen = new Map<string, number>();
		const toc: TocEntry[] = [];

		const slug = (text: string) => {
			const base = text
				.toLowerCase()
				.trim()
				.replace(/[^\p{L}\p{N}\s_-]/gu, '')
				.replace(/\s/g, '-');
			const n = seen.get(base) ?? 0;
			seen.set(base, n + 1);
			return n ? `${base}-${n}` : base;
		};

		const walk = (node: MdNode) => {
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
