export function getSanitizedPath(fileName: string): string {
	return fileName.replaceAll(/^(\.\.\/)*|(posts\/)|(\.md$)/g, '');
}

export function generateIncrementalSlugs(path: string): string[] {
	return path.split('/').map((_, idx) =>
		path
			.split('/')
			.slice(0, idx + 1)
			.join('/')
	);
}

export function getSegment(
	path: string,
	index: number | 'last'
): string | undefined {
	if (typeof index === 'number') {
		return path.split('/').at(index);
	} else {
		return path.split('/').pop();
	}
}

const extensionMap = {
	'.excalidraw': 'Excalidraw',
	'.base.yaml': 'Base',
	'.base.yml': 'Base',
	'.base': 'Base',
	'.yaml': 'Base',
	'.yml': 'Base',
	'.canvas': 'Canvas',
	'.md': 'Markdown',
	'.png': 'Image',
	'.jpg': 'Image',
	'.webp': 'Image'
};

export function cleanExtensions(path: string): string {
	let buf = path;
	for (const ext of Object.keys(extensionMap)) {
		buf = buf.replace(ext, '');
	}

	return buf;
}

export function getNameForExtension(
	path: string
): string | undefined {
	for (const ext of Object.keys(extensionMap)) {
		if (path.endsWith(ext)) {
			return extensionMap[ext as keyof typeof extensionMap];
		}
	}
}

export function numberOfSegments(path: string): number {
	return path.split('/').length;
}

export interface TreeItem {
	id: string;
	children: TreeItem[];
	depth: number;
	url: string;
}

export interface PostAndHeadingData {
	title: string;
	url: string;
}
