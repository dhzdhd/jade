interface CanvasNode {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	type: 'file' | 'text';
	file?: string;
	text?: string;
}

type Side = 'left' | 'right';

interface CanvasEdge {
	id: string;
	fromNode: string;
	fromSide: Side;
	toNode: string;
	toSide: Side;
}

function parseCanvas(content: string): any {
	const contentJson = JSON.parse(content);

	return contentJson;
}
