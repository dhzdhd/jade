<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import TreeSidebar from '$lib/components/layout/TreeSidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<ModeWatcher />
<Header config={data.config} graphData={data.graphData} />

<Sidebar storageKey="treeOpen" side="left">
	<TreeSidebar files={data.files} />
</Sidebar>
<main class="flex w-screen justify-center">
	{@render children()}
</main>
