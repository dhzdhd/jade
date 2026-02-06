import type { Canvas } from './post';

export interface CanvasNode {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	type: 'file' | 'text';
	color?: string;
	file?: string;
	text?: string;
}

export type Side = 'left' | 'right' | 'top' | 'bottom';

export interface CanvasEdge {
	id: string;
	fromNode: string;
	fromSide: Side;
	toNode: string;
	toSide: Side;
}

export function parseCanvas(content: string): Canvas {
	const contentJson = JSON.parse(content);

	return { ...contentJson, kind: 'canvas' };
}
