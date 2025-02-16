<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import Button from '../ui/button/button.svelte';
	import Graph from 'lucide-svelte/icons/git-graph';

	let container: HTMLDivElement;
	let N = 5;

	let open = $state(false);
	$inspect(open);

	const initGraph = async () => {
		const ForceGraph3D = await import('3d-force-graph');

		new ForceGraph3D.default(container)
			.graphData({
				nodes: [...Array(N).keys()].map((i) => ({ id: i })),
				links: [...Array(N).keys()]
					.filter((id) => id)
					.map((id) => ({
						source: id,
						target: Math.round(Math.random() * (id - 1))
					}))
			})
			.height(500)
			.showNavInfo(false)
			.zoomToFit(1000 * 5)
			.width(500)
			.nodeAutoColorBy('group');
	};

	$effect(() => {
		if (open) {
			initGraph();
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="animate-none transition-none">
		<Button size="icon" variant="outline">
			<Graph />
		</Button>
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
