<script lang="ts">
	import { getSegment, getSlugs, numberOfSegments } from '$lib';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import TocSidebar from '$lib/components/layout/TOCSidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const currentSlug = $derived(data.slug);
	const previousPost = $derived(
		data.allPosts.at(data.allPosts.map((post) => post.postSlug).indexOf(currentSlug) - 1)?.postSlug
	);
	const nextPost = $derived(
		data.allPosts.at(data.allPosts.map((post) => post.postSlug).indexOf(currentSlug) + 1)?.postSlug
	);

	const slugs = $derived(getSlugs(currentSlug));
	const isFolder = $derived(data.isFolder);
</script>

<div class="w-[50rem] max-w-[50rem] px-2 py-20">
	<Breadcrumb.Root class="mb-6">
		<Breadcrumb.List>
			{#each slugs.slice(0, slugs.length - 1) as slug}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={`/${slug}`}>{getSegment(slug, 'last')}</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
			{/each}
			<Breadcrumb.Item>
				<Breadcrumb.Page>{getSegment(currentSlug, 'last')}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
	{#if isFolder}
		<div class="flex flex-col gap-2">
			<h1 class="font-title mb-6 text-4xl font-bold">{getSegment(currentSlug, 'last')}</h1>
			{#each data.posts as post}
				<a
					href={`/${currentSlug}/${getSegment(post.postSlug, numberOfSegments(currentSlug))}`}
					class="hover:text-accent cursor-pointer justify-start py-2 text-lg"
				>
					{getSegment(post.postSlug, numberOfSegments(currentSlug))}
				</a>
			{/each}
		</div>
	{:else}
		<article class="prose w-full max-w-full">
			{@html data.posts[0].content}
		</article>
		<div class="mt-12 flex w-full">
			{#if previousPost}
				<a
					href={`/${previousPost}`}
					class="hover:text-accent flex w-full items-center justify-start gap-2"
					><ChevronLeft size={'1.2rem'} />Previous
				</a>
			{/if}
			{#if nextPost}
				<a
					href={`/${nextPost}`}
					class="hover:text-accent flex w-full items-center justify-end gap-2"
					>Next <ChevronRight size={'1.2rem'} /></a
				>
			{/if}
		</div>
		<Sidebar storageKey="tocOpen" side="right">
			<TocSidebar headings={data.posts[0].headings} />
		</Sidebar>
	{/if}
</div>

<style>
	@reference "../../app.css";

	article :global {
		* {
			@apply text-primary font-normal;
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
