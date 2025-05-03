export function getSlug(fileName: string): string {
    return ''
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
