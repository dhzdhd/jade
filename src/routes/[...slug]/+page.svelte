<script lang="ts">
	import TocSidebar from '$lib/components/layout/TOCSidebar.svelte';
	import type { PageProps } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index';

	const { data }: PageProps = $props();

	const content = data.post.content;
	const headings = data.post.headings;
	const code = content;

	// function getPost(posts: any) {
	// 	return posts.filter((post: any) => post.slug === data.slug)[0];
	// }
</script>

<!-- {#await data.posts}
	<div class="flex h-screen w-screen items-center justify-center">
		<h1>Loading</h1>
	</div>
{:then posts} -->
<article class="prose w-[50rem] max-w-[50rem] px-2 py-20">
	{@html content}
</article>
<Sidebar.Provider class="fixed max-w-52">
	<TocSidebar {headings} />
</Sidebar.Provider>

<!-- {/await} -->

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
			@apply font-title;
		}

		a {
			@apply text-accent no-underline hover:underline;
		}

		p {
			@apply text-lg;
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

			/* Other styling */
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
