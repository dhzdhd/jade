<script lang="ts">
	import { renderMermaid } from '$lib/mermaid';
	import type {
		Folder,
		Markdown,
		Post,
		Excalidraw as ExcalidrawData
	} from '$lib/post';
	import { onMount } from 'svelte';
	import TocSidebar from '$lib/components/layout/TOCSidebar.svelte';
	import type { PageProps } from './$types';
	import { getSettings } from '$lib/state/settings.svelte';
	import { mode } from 'mode-watcher';
	import { cn } from '$lib/utils';
	import { getSegment } from '$lib';
	import Excalidraw from '$lib/components/Excalidraw.svelte';
	import Canvas from '$lib/components/canvas/Canvas.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import MarkdownRenderer from '$lib/components/markdown/MarkdownRenderer.svelte';
	import BaseLayout from '$lib/components/bases/BaseLayout.svelte';

	const { data }: PageProps = $props();
	const posts: Post[] = $derived(data.posts);
	const post = $derived(
		posts
			.filter(
				(post) =>
					post.incrementalSlugs.length === 0 && post.slug === '.'
			)
			.at(0)
	);

	const settings = getSettings();
	const curTheme = $derived(mode.current);

	onMount(() => renderMermaid(curTheme!));

	$effect(() => {
		renderMermaid(curTheme!);
	});
</script>

{#if post === undefined}
	<h1>Hello World</h1>
{:else}
	<div
		class={cn([
			settings.current.isHeaderVisible ? 'py-20' : 'py-6',
			'w-full max-w-200 px-4'
		])}
	>
		{#if post.data.kind === 'folder'}
			<div class="flex flex-col gap-2">
				<h1 class="font-title mb-6 text-4xl font-bold">
					{getSegment(post.slug, 'last')}
				</h1>
				{#each (post.data as Folder).posts as child}
					<a
						href={`/${child.slug}`}
						class="hover:text-accent cursor-pointer justify-start py-2 text-lg"
					>
						{child.slug.replace(`${post.slug}/`, '')}
					</a>
				{/each}
			</div>
		{:else if post.data.kind === 'excalidraw'}
			<Excalidraw
				slug={post.slug}
				data={(post.data as ExcalidrawData).excalidrawJson}
			/>
		{:else if post.data.kind === 'base'}
			<BaseLayout data={post.data}></BaseLayout>
		{:else if post.data.kind === 'markdown'}
			<MarkdownRenderer {post} />

			<Sidebar storageKey="tocOpen" side="right">
				<TocSidebar headings={(post.data as Markdown).headings} />
			</Sidebar>
		{:else if post.data.kind === 'canvas'}
			<Canvas data={post.data} />
		{:else}
			<div>Unknown</div>
		{/if}
	</div>
{/if}
