export function getSlug(fileName: string): string {
    return ''
}

export interface TreeItem {
    id: string;
    children: TreeItem[];
    depth: number;
    url: string;
}
