<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import type { GraphData } from '$lib/graph';
	import Button from '../ui/button/button.svelte';
	import Graph from 'lucide-svelte/icons/git-graph';

	interface ForceGraphProps {
		data: GraphData;
	}

	let container: HTMLDivElement;

	let { data }: ForceGraphProps = $props();
	let open = $state(false);

	const initGraph = async () => {
		const ForceGraph3D = await import('3d-force-graph');

		const inst = new ForceGraph3D.default(container)
			.graphData({
				nodes: data.nodes,
				links: data.links
			})
			.height(500)
			.width(500)
			.showNavInfo(false)
			.zoomToFit(100 * 5)
			.backgroundColor('#23252F')
			.nodeAutoColorBy('group')
			.nodeLabel((node: any) => node.label)
			.onLinkHover((link, prev) => {
				inst.linkWidth(link === null ? 1 : 2);
			})
			.onNodeClick(async (node: any, event) => {
				if (node) {
					open = false;
					await goto(node.url);
				}
			})
			.onNodeHover((node, prev) => {
				inst.nodeColor(node === null ? '#232323' : '#23FFFF');
			});
	};

	$effect(() => {
		if (open) {
			initGraph();
		}
	});
</script>

<Dialog.Root bind:open>
	<Button
		onclick={() => (open = true)}
		size="icon"
		variant="outline"
		aria-label="Graph View Button"
	>
		<Graph />
	</Button>
	<Dialog.Content
		class="w-[90%] animate-none transition-none md:min-w-140"
	>
		<Dialog.Header>
			<Dialog.Title>Graph View</Dialog.Title>
		</Dialog.Header>
		<div
			bind:this={container}
			class="graph-container aspect-square max-w-[90%] overflow-hidden md:h-80"
		></div>
	</Dialog.Content>
</Dialog.Root>

<style>
	@reference "../../../app.css";
</style>
