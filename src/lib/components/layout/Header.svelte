<script lang="ts">
	import type { Config } from '../../../../.config/config';
	import ForceGraph from './ForceGraph.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	interface HeaderProps {
		config: Config;
	}

	let { config }: HeaderProps = $props();
</script>

<header class="bg-background fixed z-20 flex h-16 w-screen items-center justify-between px-2">
	<h1 class="font-title pl-3 text-xl">{config.title}</h1>
	<div>
		<ForceGraph />
		<ThemeSwitcher />
	</div>
</header>
