<script lang="ts">
	import type { GraphData } from '$lib';
	import type { Config } from '$lib/config';
	import ForceGraph from './ForceGraph.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	interface HeaderProps {
		config: Config;
		graphData: GraphData;
	}

	let { config, graphData }: HeaderProps = $props();
</script>

<header class="bg-background fixed z-20 flex h-16 w-screen items-center justify-between px-4">
	<a href="/" class="font-title text-xl">{config.title ?? 'Jade'}</a>
	<div>
		<ForceGraph data={graphData} />
		<ThemeSwitcher />
	</div>
</header>
