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
		const THREE = await import('three');
		const ForceGraph3D = await import('3d-force-graph');

		const inst = new ForceGraph3D.default(container)
			.graphData({
				nodes: data.nodes,
				links: data.links
			})
			.width(container.clientWidth)
			.height(container.clientWidth)
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
			});

		// inst.nodeThreeObject((node: any) => {
		// 	const group = new THREE.Group();
		// 	group.add(
		// 		new THREE.Mesh(
		// 			new THREE.SphereGeometry(4),
		// 			new THREE.MeshBasicMaterial({ color: node.color })
		// 		)
		// 	);

		// 	const sprite = new THREE.Sprite();
		// 	const canvas = document.createElement('canvas');

		// 	const ctx = canvas.getContext('2d');
		// 	if (!ctx) return group;

		// 	const fontSize = 16;
		// 	ctx.font = `${fontSize}px Sans-Serif`;
		// 	const text = node.label;
		// 	const textWidth = ctx.measureText(text).width;
		// 	canvas.width = textWidth + 8;
		// 	canvas.height = fontSize + 8;

		// 	// ctx.fillStyle = 'rgba(40, 40, 50, 0.9)';
		// 	// ctx.fillRect(0, 0, canvas.width, canvas.height);

		// 	ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		// 	ctx.textAlign = 'center';
		// 	ctx.textBaseline = 'middle';
		// 	// ctx.fillText(text, canvas.width / 2, canvas.height / 2);

		// 	const texture = new THREE.CanvasTexture(canvas);
		// 	sprite.material = new THREE.SpriteMaterial({ map: texture });
		// 	const scale = 0.2;
		// 	sprite.scale.set(
		// 		canvas.width * scale,
		// 		canvas.height * scale,
		// 		1
		// 	);
		// 	sprite.position.y -= 10; // move label below node
		// 	group.add(sprite);

		// 	return group;
		// });

		inst.d3Force('charge')?.strength(-25);
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
			class="graph-container aspect-square w-full overflow-hidden"
		></div>
	</Dialog.Content>
</Dialog.Root>

<style>
	@reference "../../../app.css";
</style>
