<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const content = data.post.content;
	console.log(content);
</script>

<article class="px-2 pt-16">
	{@html content?.code}
</article>
