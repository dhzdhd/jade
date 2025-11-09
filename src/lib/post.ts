import type { FileProperties } from './bases';

export interface Heading {
	level: number;
	text: string;
	url: string;
}

export interface Post {
	fileName: string;
	slug: string;
	content: string;
	data: PostData;
	incrementalSlugs: string[];
}

export type Markdown = {
	kind: 'markdown';
	headings: Heading[];
	links: string[];
};
export type Excalidraw = {
	kind: 'excalidraw';
	excalidrawJson: string;
};
export type Bases = {
	kind: 'base';
	fileProperties: FileProperties[];
};
export type Jupyter = {
	kind: 'jupyter';
};
export type Folder = {
	kind: 'folder';
	posts: Post[];
};
export type Invalid = {
	kind: 'invalid';
};

type PostData =
	| Markdown
	| Folder
	| Excalidraw
	| Bases
	| Jupyter
	| Invalid;
