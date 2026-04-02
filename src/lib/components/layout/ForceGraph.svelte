<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import type { GraphData } from '$lib/graph';
	import Button from '../ui/button/button.svelte';
	import Graph from '@lucide/svelte/icons/git-graph';

	interface ForceGraphProps {
		data: GraphData;
	}

	let container: HTMLDivElement;

	let { data }: ForceGraphProps = $props();
	let open = $state(false);

	// https://github.com/tailwindlabs/tailwindcss/discussions/17282#discussioncomment-15101767
	function oklchToHex(oklchString: string): string {
		function linearToSrgb(val: number) {
			if (val <= 0.0031308) {
				return 12.92 * val;
			}
			return 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
		}
		// Parse OKLCH string
		const match = oklchString.match(
			/oklch\s*\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:deg)?\s*\)/i
		);

		if (!match) {
			throw new Error('Invalid OKLCH string format');
		}

		let l = parseFloat(match[1]);
		let c = parseFloat(match[2]);
		let h = parseFloat(match[3]);

		// Convert percentage lightness to 0-1 range
		if (oklchString.includes('%')) {
			l = l / 100;
		}
		// Convert OKLCH to OKLAB
		const hRad = (h * Math.PI) / 180;
		const a = c * Math.cos(hRad);
		const b = c * Math.sin(hRad);

		// Convert OKLAB to linear RGB
		const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
		const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
		const s_ = l - 0.0894841775 * a - 1.291485548 * b;

		const l3 = l_ * l_ * l_;
		const m3 = m_ * m_ * m_;
		const s3 = s_ * s_ * s_;

		let r =
			+4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
		let g =
			-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
		let b_rgb =
			-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

		// Convert linear RGB to sRGB
		r = linearToSrgb(r);
		g = linearToSrgb(g);
		b_rgb = linearToSrgb(b_rgb);

		// Clamp and convert to 8-bit
		r = Math.max(0, Math.min(255, Math.round(r * 255)));
		g = Math.max(0, Math.min(255, Math.round(g * 255)));
		b_rgb = Math.max(0, Math.min(255, Math.round(b_rgb * 255)));

		// Convert to hex
		return (
			'#' +
			[r, g, b_rgb]
				.map((x) => x.toString(16).padStart(2, '0'))
				.join('')
		);
	}

	const initGraph = async () => {
		const ForceGraph3D = await import('3d-force-graph');

		const bgColor = getComputedStyle(document.documentElement)
			.getPropertyValue('--background')
			.trim();
		console.log(bgColor);

		const rgbColor = bgColor.startsWith('oklch')
			? oklchToHex(bgColor)
			: bgColor;

		const inst = new ForceGraph3D.default(container)
			.graphData({
				nodes: data.nodes,
				links: data.links
			})
			.width(container.clientWidth)
			.height(container.clientWidth)
			.showNavInfo(false)
			.zoomToFit(1000 * 5)
			.backgroundColor(rgbColor)
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
