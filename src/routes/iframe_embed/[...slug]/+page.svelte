<script lang="ts">
	import { getSegment } from '$lib';
	import type { PageProps } from './$types';
	import {
		type Excalidraw as ExcalidrawData,
		type Folder,
		type Markdown,
		type Post
	} from '$lib/post';
	import Excalidraw from '$lib/components/Excalidraw.svelte';
	import BaseLayout from '$lib/components/bases/BaseLayout.svelte';
	import Canvas from '$lib/components/canvas/Canvas.svelte';
	import MarkdownRenderer from '$lib/components/markdown/MarkdownRenderer.svelte';
	import { renderMermaid } from '$lib/mermaid';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';

	const { data }: PageProps = $props();
	const post: Post = $derived(data.post);

	const curTheme = $derived(mode.current);

	onMount(() => renderMermaid(curTheme!));

	$effect(() => {
		renderMermaid(curTheme!);
	});
</script>

<div class="p-4">
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
	{:else if post.data.kind === 'canvas'}
		<Canvas data={post.data} />
	{:else}
		<div>Unknown</div>
	{/if}
</div>
