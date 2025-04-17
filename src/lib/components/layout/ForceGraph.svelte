<script lang="ts">
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
			.showNavInfo(false)
			.zoomToFit(1000 * 5)
			.backgroundColor('#23252F')
			.width(500)
			.nodeAutoColorBy('group');

		inst.onLinkHover((link, prev) => {
			inst.linkWidth(link === null ? 1 : 2);
		});

		inst.onNodeHover((node, prev) => {
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
	<Dialog.Trigger
		class="border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 animate-none border transition-none"
	>
		<Graph />
	</Dialog.Trigger>
	<Dialog.Content class="min-w-[35rem] animate-none transition-none">
		<Dialog.Header>
			<Dialog.Title>Graph View</Dialog.Title>
		</Dialog.Header>
		<div bind:this={container} class="graph-container h-[32rem] w-[32rem]"></div>
	</Dialog.Content>
</Dialog.Root>

<style>
	@reference "../../../app.css";
</style>
