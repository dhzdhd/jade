<script lang="ts">
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';

	interface Props {
		previousPost?: string;
		nextPost?: string;
	}

	const { previousPost, nextPost }: Props = $props();
</script>

<div class="mt-12 flex w-full">
	{#if previousPost}
		<a
			href={`/${previousPost}`}
			class="hover:text-accent flex w-full items-center justify-start gap-2"
			><ChevronLeft size={'1.2rem'} />Previous
		</a>
	{/if}
	{#if nextPost}
		<a href={`/${nextPost}`} class="hover:text-accent flex w-full items-center justify-end gap-2"
			>Next <ChevronRight size={'1.2rem'} /></a
		>
	{/if}
</div>
