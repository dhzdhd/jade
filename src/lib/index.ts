export function getSanitizedPath(fileName: string): string {
    return fileName.replaceAll(/^(\.\.\/)*|(posts\/)|(\.md$)/g, '');
}

export function getSlugs(path: string): string[] {
    return path.split('/').map((_, idx) => path.split('/').slice(0, idx + 1).join('/'));
}

export function getSegment(path: string, index: number | 'last'): string | undefined {
    if (typeof index === 'number') {
        return path.split('/').at(index);
    } else {
        return path.split('/').pop();
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

export interface Node {
    id: string;
    label: string;
    url: string;
}

export interface Link {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: Node[];
    links: Link[];
}

export interface PostAndHeadingData {
    title: string;
    url: string;
}