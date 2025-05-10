<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import TreeSidebar from '$lib/components/layout/TreeSidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { onNavigate } from '$app/navigation';
	import { PressedKeys } from 'runed';

	let { children, data }: LayoutProps = $props();

	const keys = new PressedKeys();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>{data.config.title}</title>
</svelte:head>

<ModeWatcher />
<Header config={data.config} graphData={data.graphData} />

<Sidebar storageKey="treeOpen" side="left">
	<TreeSidebar files={data.files} />
</Sidebar>
<main class="flex w-full max-w-svw justify-center">
	{@render children()}
</main>
