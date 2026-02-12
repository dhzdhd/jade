<script lang="ts">
	import {
		cleanExtensions,
		getSegment,
		numberOfSegments
	} from '$lib';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import TocSidebar from '$lib/components/layout/TOCSidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import type { PageProps } from './$types';
	import { cn } from '$lib/utils';
	import { getSettings } from '$lib/state/settings.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
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

	const { data }: PageProps = $props();
	const post: Post = $derived(data.post);
	const previousPostSlug = $derived(data.previousPost?.slug);
	const nextPostSlug = $derived(data.nextPost?.slug);

	const settings = getSettings();
</script>

<div
	class={cn([
		settings.current.isHeaderVisible ? 'py-20' : 'py-6',
		'w-full max-w-200 px-4'
	])}
>
	<Breadcrumb.Root class="mb-6">
		<Breadcrumb.List>
			{#each post.incrementalSlugs.slice(0, post.incrementalSlugs.length - 1) as slug}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={`/${slug}`}
						>{getSegment(slug, 'last')}</Breadcrumb.Link
					>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
			{/each}
			<Breadcrumb.Item>
				<Breadcrumb.Page>
					{cleanExtensions(getSegment(post.slug, 'last') ?? '')}
				</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
	{#if post.data.kind === 'folder'}
		<div class="flex flex-col gap-2">
			<h1 class="font-title mb-6 text-4xl font-bold">
				{getSegment(post.slug, 'last')}
			</h1>
			{#each (post.data as Folder).posts as child}
				<a
					href={child.slug}
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
		<BottomNav
			previousPost={previousPostSlug}
			nextPost={nextPostSlug}
		/>
	{:else if post.data.kind === 'base'}
		<BaseLayout data={post.data}></BaseLayout>
	{:else if post.data.kind === 'markdown'}
		<MarkdownRenderer {post} />
		<BottomNav
			previousPost={previousPostSlug}
			nextPost={nextPostSlug}
		/>
		<Sidebar storageKey="tocOpen" side="right">
			<TocSidebar headings={(post.data as Markdown).headings} />
		</Sidebar>
	{:else if post.data.kind === 'canvas'}
		<Canvas data={post.data} />
		<BottomNav
			previousPost={previousPostSlug}
			nextPost={nextPostSlug}
		/>
	{:else}
		<div>Unknown</div>
	{/if}
</div>
