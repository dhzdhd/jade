<script lang="ts">
	import TreeNode from './TreeNode.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from '../ui/button/button.svelte';
	import type { TreeItem } from '$lib';
	import ArrowRight from 'lucide-svelte/icons/chevron-right';
	import ArrowDown from 'lucide-svelte/icons/chevron-down';

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
			class="hover:bg-accent active:bg-accent flex flex-row justify-between py-5"
		>
			{#snippet child({ props })}
				<!-- <Button
					onclick={toggleExpansion}
					variant="ghost"
					class="w-full px-2"
					style={`padding-left: ${0.5 + depth * 0.6}rem`}
				>
					<span class="w-full text-left">
						{id}
					</span>
				</Button> -->
				<button onclick={toggleExpansion} {...props}>
					<span>{id}</span>
					{#if expanded}
						<ArrowDown />
					{:else}
						<ArrowRight />
					{/if}
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
		<Sidebar.MenuButton onclick={toggleExpansion} class="hover:bg-accent active:bg-accent py-5">
			{#snippet child({ props })}
				<!-- <a href="/">
					<Button
						onclick={toggleExpansion}
						variant="ghost"
						class="w-full px-2"
						style={`padding-left: ${0.5 + depth * 0.6}rem`}
					>
						<span class="w-full text-left">
							{id}
						</span>
					</Button>
				</a> -->
				<a
					href={url}
					onclick={toggleExpansion}
					{...props}
					style={`padding-left: ${0.5 + depth * 0.6}rem`}
				>
					<span>{id}</span>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/if}
