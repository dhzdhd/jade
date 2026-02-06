<script lang="ts">
	import type { Post } from '$lib/post';

	interface Props {
		post: Post;
	}

	const { post }: Props = $props();
</script>

<article class="prose w-full max-w-full">
	{@html post.content}
</article>

<style>
	@reference "../../../app.css";

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
