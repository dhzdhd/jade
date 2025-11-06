<script lang="ts">
	import type { Heading } from '$lib/post';
	import Button from '../ui/button/button.svelte';
	import { page } from '$app/state';

	interface TOCSidebarProps {
		headings: Heading[];
	}

	const { headings }: TOCSidebarProps = $props();
</script>

{#each headings as heading}
	{@const isActive = page.url.hash === heading.url}

	<li class="m-0 p-0">
		<Button
			variant={isActive ? 'secondary' : 'ghost'}
			class="flex h-fit w-full flex-row justify-between overflow-clip p-0 text-left"
		>
			<a
				href={heading.url}
				style={`padding-left: ${heading.level - 0.5 * 1}rem`}
				class="w-full px-1 py-2"
			>
				<span class="text-left text-wrap">{heading.text}</span>
			</a>
		</Button>
	</li>
{/each}
