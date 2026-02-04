<script lang="ts">
	import { getSegment, numberOfSegments } from '$lib';
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
				<Breadcrumb.Page
					>{getSegment(post.slug, 'last')?.replace(
						'.excalidraw',
						''
					)}</Breadcrumb.Page
				>
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
		<article class="prose w-full max-w-full">
			{@html post.content}
		</article>
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
	{/if}
</div>

<style>
	@reference "../../app.css";

	article :global {
		* {
			@apply text-foreground font-normal;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			@apply font-title scroll-mt-16;
		}

		a {
			@apply text-accent no-underline hover:underline;
		}

		p {
			@apply text-lg/5.5;
		}

		code:not(pre > code) {
			&::after,
			&::before {
				@apply hidden;
			}

			@apply bg-primary-foreground/60 rounded-sm px-2 py-1;
		}

		li {
			@apply text-lg/5.5;

			&::marker {
				@apply text-primary/50;
			}
		}

		.katex-html {
			@apply hidden;
		}

		pre {
			overflow-x: auto;
			padding: 1rem 0;
		}

		pre [data-line] {
			padding: 0 1rem;
		}

		figcaption[data-rehype-pretty-code-title] {
			@apply bg-accent px-2 text-black;
		}

		code {
			@apply font-mono;
		}

		span {
			@apply font-mono;
		}

		code[data-line-numbers] {
			counter-reset: line;
		}

		code[data-line-numbers] > [data-line]::before {
			counter-increment: line;
			content: counter(line);

			display: inline-block;
			width: 0.25rem;
			margin-right: 1rem;
			text-align: right;
			color: gray;
		}

		code[data-line-numbers-max-digits='2'] > [data-line]::before {
			width: 0.75rem;
		}

		code[data-line-numbers-max-digits='3'] > [data-line]::before {
			width: 1.25rem;
		}

		code[data-line-numbers-max-digits='4'] > [data-line]::before {
			width: 1.75rem;
		}
	}
</style>
