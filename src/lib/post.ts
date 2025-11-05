import jsdom from 'jsdom';

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

export function generateHeadings(content: string): Heading[] {
	const parser = new jsdom.JSDOM(content.toString());
	const document = parser.window.document;
	const headingNodes = document.querySelectorAll(
		'h1, h2, h3, h4, h5, h6'
	);

	return Array.from(headingNodes).map((heading) => ({
		level: parseInt(heading.tagName.substring(1), 10),
		text: heading.textContent || '',
		url: `#${heading.id}`
	}));
}
