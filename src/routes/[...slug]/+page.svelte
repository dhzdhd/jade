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
</style>
