<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import TreeSidebar from '$lib/components/layout/TreeSidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { onNavigate } from '$app/navigation';

	let { children, data }: LayoutProps = $props();

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
	<meta name="description" content={data.config.description ?? 'Jade SSG generated site'} />
</svelte:head>

<ModeWatcher />
<Header config={data.config} graphData={data.graphData} postsAndHeadings={data.postsAndHeadings} />

<Sidebar storageKey="treeOpen" side="left">
	<TreeSidebar files={data.files} />
</Sidebar>
<main class="flex w-full max-w-svw justify-center">
	{@render children()}
</main>
