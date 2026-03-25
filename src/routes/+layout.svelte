<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import TreeSidebar from '$lib/components/layout/TreeSidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let { children, data }: LayoutProps = $props();

	const embedded = $derived(
		page.url.pathname.includes('iframe_embed')
	);

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
	<meta
		name="description"
		content={data.config.description ?? 'Jade SSG generated site'}
	/>
</svelte:head>

<ModeWatcher />

{#if embedded}
	{@render children()}
{:else}
	<Header
		config={data.config}
		graphData={data.graphData}
		postsAndHeadings={data.postsAndHeadings}
	/>

	<Sidebar storageKey="treeOpen" side="left">
		<TreeSidebar files={data.files} />
	</Sidebar>
	<main class="flex w-full max-w-svw justify-center">
		{@render children()}
	</main>
{/if}
