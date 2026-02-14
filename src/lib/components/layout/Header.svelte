<script lang="ts">
	import type { PostAndHeadingData } from '$lib';
	import type { Config } from '$lib/config';
	import type { GraphData } from '$lib/graph';
	import { getSettings } from '$lib/state/settings.svelte';
	import { cn } from '$lib/utils';
	import ForceGraph from './ForceGraph.svelte';
	import Search from './Search.svelte';
	import Settings from './Settings.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	interface HeaderProps {
		config: Config;
		graphData: GraphData;
		postsAndHeadings: PostAndHeadingData[];
	}

	const { config, graphData, postsAndHeadings }: HeaderProps =
		$props();
	const settings = getSettings();
</script>

<header
	class={cn([
		settings.current.isHeaderVisible ? 'flex' : 'hidden',
		'bg-background fixed z-50 h-16 w-screen items-center justify-between px-4'
	])}
>
	<a href="/" class="font-title text-xl">{config.title ?? 'Jade'}</a>
	<div>
		<Search {postsAndHeadings} />
		<ForceGraph data={graphData} />
		<ThemeSwitcher />
		<Settings />
	</div>
</header>
