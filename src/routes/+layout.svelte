<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import TreeSidebar from '$lib/components/layout/TreeSidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import { PersistedState, onClickOutside } from 'runed';

	let { children, data }: LayoutProps = $props();

	let container = $state<HTMLElement>()!;
	// onClickOutside(
	// 	() => container,
	// 	() => (open.current = false)
	// );

	const open = new PersistedState('treeOpen', true);
</script>

<ModeWatcher />
<Header config={data.config} graphData={data.graphData} />
<Sidebar.Provider
	bind:open={() => open.current, (newOpen) => (open.current = newOpen)}
	class="max-h-0 max-w-0"
>
	<div bind:this={container}>
		<TreeSidebar files={data.files} />
	</div>
	<Sidebar.Inset>
		<main class="flex w-screen justify-center">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
