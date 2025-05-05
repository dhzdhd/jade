<script lang="ts">
	import { getSegment, numberOfSegments } from '$lib';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import TocSidebar from '$lib/components/layout/TOCSidebar.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const currentSlug = data.slug;
	const isFolder = data.isFolder;
</script>

{#if isFolder}
	<div class="flex w-[50rem] max-w-[50rem] flex-col gap-2 px-2 py-20">
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
	<article class="prose w-[50rem] max-w-[50rem] px-2 py-20">
		{@html data.posts[0].content}
	</article>
	<Sidebar storageKey="tocOpen" side="right">
		<TocSidebar headings={data.posts[0].headings} />
	</Sidebar>
{/if}

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

		li {
			@apply text-lg/5.5;

			&::marker {
				@apply text-primary/50;
			}

			> code {
				&::after,
				&::before {
					@apply hidden;
				}

				@apply bg-primary-foreground/60 rounded-sm px-2 py-1;
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
