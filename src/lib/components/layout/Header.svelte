<script lang="ts">
	import type { Config } from '../../../../.config/config';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	interface HeaderProps {
		config: Config;
	}

	let { config }: HeaderProps = $props();
</script>

<header class="bg-background fixed z-20 flex h-16 w-screen items-center justify-between px-2">
	<h1>{config.title}</h1>
	<div>
		<ThemeSwitcher />
	</div>
</header>
