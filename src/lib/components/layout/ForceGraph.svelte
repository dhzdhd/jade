<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GraphData } from '$lib';
	import * as Dialog from '$lib/components/ui/dialog/index';
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
			.zoomToFit(1000 * 5)
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
	<Dialog.Content class="animate-none transition-none md:min-w-[35rem]">
		<Dialog.Header>
			<Dialog.Title>Graph View</Dialog.Title>
		</Dialog.Header>
		<div bind:this={container} class="graph-container m:h-[32rem] aspect-square"></div>
	</Dialog.Content>
</Dialog.Root>

<style>
	@reference "../../../app.css";
</style>
