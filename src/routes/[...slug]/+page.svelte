<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const content = data.post.content;
	const code = content;
</script>

<article class="typography prose w-[60rem] max-w-[60rem] px-2 pt-16">
	{@html code}
</article>

<style>
	@reference "../../app.css";

	article :global {
		* {
			@apply text-primary;
		}

		a {
			@apply text-accent no-underline hover:underline;
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
