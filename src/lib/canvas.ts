import ImageNode from './components/canvas/ImageNode.svelte';
import MarkdownNode from './components/canvas/MarkdownNode.svelte';
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

export interface CanvasData {
	nodes: CanvasNode[];
	edges: CanvasEdge[];
}

export const nodeTypes = {
	markdown: MarkdownNode,
	image: ImageNode
} as const;
export type CanvasFlowNodeData =
	| {
			type: 'file';
			content: string;
	  }
	| { type: 'text'; content: string };
export type CanvasFlowNodePosition = { x: number; y: number };

export interface CanvasFlowNode {
	id: string;
	type: keyof typeof nodeTypes;
	width: number;
	height: number;
	position: CanvasFlowNodePosition;
	data: CanvasFlowNodeData;
}

export interface CanvasFlowEdge {
	id: string;
	source: string;
	sourceHandle: Side;
	target: string;
	targetHandle: Side;
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

export function convertToFlowModelEdges(
	edges: CanvasEdge[]
): CanvasFlowEdge[] {
	return edges.map((edge) => {
		return {
			id: edge.id,
			source: edge.fromNode,
			sourceHandle: edge.fromSide,
			target: edge.toNode,
			targetHandle: edge.toSide
		} satisfies CanvasFlowEdge;
	});
}

export function convertToFlowModelNodes(
	nodes: CanvasNode[]
): CanvasFlowNode[] {
	return nodes.map((node) => {
		const data: CanvasFlowNodeData =
			node.file === undefined
				? { type: 'text', content: node.text! }
				: {
						type: 'file',
						content: node.file
					};

		return {
			id: node.id,
			width: node.width,
			height: node.height,
			position: {
				x: node.x,
				y: node.y
			} satisfies CanvasFlowNodePosition,
			type: data.type === 'file' ? 'markdown' : 'image',
			data: data
		} satisfies CanvasFlowNode;
	});
}
