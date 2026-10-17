import guideIndex from './generated/docs.json';
import projectData from './data/projects.json';

export const GITHUB = 'https://github.com/fractalmandala';

export type Snippet = { title: string; lang: string; code: string };
export type Stat = { value: string; label: string };
export type Feature = { title: string; body: string };

export type Project = {
	name: string;
	slug: string;
	status: 'current' | 'published' | 'stale' | 'uncertain';
	gitlink: string | null;
	npmlink: string | null;
	description: string;
	tags: string[];
};

/** Every project in src/lib/data/projects.json tagged `website`. */
export const projects: Project[] = (projectData as Project[]).filter((p) =>
	p.tags.includes('website')
);

/** The package-shaped view of a project: name, slug, description, gitlink and npmlink. */
export type Package = Pick<Project, 'name' | 'slug' | 'description' | 'gitlink' | 'npmlink'>;

/** Look a project up in projects.json by name or slug and keep its package fields. */
function pkg(input: string): Package {
	const project = projects.find((p) => p.name === input || p.slug === input);
	if (!project) throw new Error(`${input} is missing from projects.json`);
	const { name, slug, description, gitlink, npmlink } = project;
	return { name, slug, description, gitlink, npmlink };
}

export type Guide = { slug: string; title: string; description: string };

/** Guides copied from each package's folder by scripts/copy-docs.mjs */
export const guides = guideIndex as Record<string, Guide[] | undefined>;

export function findProject(slug: string) {
	return projects.find((p) => p.slug === slug);
}

export const managers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export type Manager = (typeof managers)[number];

export function installCommand(manager: Manager, names: string[], dev = false) {
	const list = names.join(' ');
	switch (manager) {
		case 'npm':
			return `npm install${dev ? ' -D' : ''} ${list}`;
		case 'yarn':
			return `yarn add${dev ? ' -D' : ''} ${list}`;
		case 'bun':
			return `bun add${dev ? ' -d' : ''} ${list}`;
		default:
			return `pnpm add${dev ? ' -D' : ''} ${list}`;
	}
}
