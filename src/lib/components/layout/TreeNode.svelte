<script lang="ts">
	import TreeNode from './TreeNode.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { TreeItem } from '$lib';
	import ArrowRight from 'lucide-svelte/icons/chevron-right';

	let { id, children, depth, url }: TreeItem = $props();

	let expanded = $state(false);

	const toggleExpansion = (e: any) => {
		e.stopPropagation();
		expanded = !expanded;
	};
</script>

{#if children.length !== 0}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			onclick={toggleExpansion}
			class="hover:bg-accent active:bg-accent flex flex-row justify-between py-2 px-1 cursor-pointer h-fit"
		>
			{#snippet child({ props })}
				<button
					onclick={toggleExpansion}
					style={`padding-left: ${0.5 + depth * 0.6}rem`}
					{...props}
				>
					<span>{id}</span>
					<ArrowRight
						style="transition: transform 200ms; transform: rotate({expanded ? '90deg' : '0deg'});"
					/>
				</button>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>

	{#if expanded}
		{#each children as child}
			<TreeNode id={child.id} children={child.children} depth={child.depth} url={child.url} />
		{/each}
	{/if}
{:else}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton class="hover:bg-accent active:bg-accent py-2 px-1 h-fit">
			{#snippet child({ props })}
				<a href={url} {...props} style={`padding-left: ${0.5 + depth * 0.6}rem`}>
					<span>{id}</span>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/if}
