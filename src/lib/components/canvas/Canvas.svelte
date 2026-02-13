<script lang="ts">
	import type { Canvas } from '$lib/post';
	import { Background, SvelteFlow } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import {
		convertToFlowModelEdges,
		convertToFlowModelNodes,
		nodeTypes
	} from '$lib/canvas';

	interface Props {
		data: Canvas;
	}

	const { data }: Props = $props();

	let nodes = $state.raw(convertToFlowModelNodes(data.nodes));
	let edges = $state.raw(convertToFlowModelEdges(data.edges));
</script>

<div class="canvas__ h-full w-full">
	<SvelteFlow
		bind:nodes
		bind:edges
		{nodeTypes}
		fitView
		nodesConnectable={false}
		nodesDraggable={false}
	>
		<Background />
	</SvelteFlow>
</div>

<style>
	.canvas__ {
		height: calc(100vh - 16rem);
	}

	:global(.svelte-flow__background) {
		background-color: var(--color-background);
	}

	:global(.svelte-flow__node) {
		background-color: var(--color-background);
		color: var(--color-foreground);
		border: solid;
		border-width: 0.1rem;
		border-radius: 1rem;
		border-color: var(--color-primary);
	}

	:global(.svelte-flow__edge-path) {
		stroke: var(--color-accent);
		stroke-width: 0.2rem;
	}
</style>
