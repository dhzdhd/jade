<script lang="ts">
	import type { GraphData } from '$lib';
	import type { Config } from '$lib/config';
	import { getSettings } from '$lib/state/settings.svelte';
	import { cn } from '$lib/utils';
	import ForceGraph from './ForceGraph.svelte';
	import Settings from './Settings.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	interface HeaderProps {
		config: Config;
		graphData: GraphData;
	}

	let { config, graphData }: HeaderProps = $props();
	const settings = getSettings();
</script>

<header
	class={cn([
		settings.current.isHeaderVisible ? 'flex' : 'hidden',
		'bg-background fixed z-20 h-16 w-screen items-center justify-between px-4'
	])}
>
	<a href="/" class="font-title text-xl">{config.title ?? 'Jade'}</a>
	<div>
		<ForceGraph data={graphData} />
		<ThemeSwitcher />
		<Settings />
	</div>
</header>
