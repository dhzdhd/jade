<script lang="ts">
	import TreeNode from './TreeNode.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import {
		generateIncrementalSlugs,
		getNameForExtension,
		type TreeItem
	} from '$lib';
	import ArrowRight from 'lucide-svelte/icons/chevron-right';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { Badge } from '../ui/badge';

	let { id, children, depth, url }: TreeItem = $props();

	// TODO: Move logic to parent as url isn't covered for every link & encode HTML properly
	let isActive = $derived(
		generateIncrementalSlugs(page.url.pathname).includes(
			url.replaceAll(' ', '%20')
		)
	);
	let expanded = $derived(isActive);

	const toggleExpansion = (e: any) => {
		e.stopPropagation();
		expanded = !expanded;
	};

	const nameForExtension = getNameForExtension(url);
</script>

{#if children.length !== 0}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			onclick={toggleExpansion}
			class="hover:bg-accent active:bg-accent flex h-fit cursor-pointer flex-row justify-between px-1 py-2"
		>
			{#snippet child({ props })}
				<button
					onclick={toggleExpansion}
					style={`padding-left: ${0.5 + depth * 0.6}rem`}
					{...props}
				>
					<span>{id}</span>
					<ArrowRight
						style="transition: transform 200ms; transform: rotate({expanded
							? '90deg'
							: '0deg'});"
					/>
				</button>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>

	{#if expanded}
		{#each children as child}
			<TreeNode
				id={child.id}
				children={child.children}
				depth={child.depth}
				url={child.url}
			/>
		{/each}
	{/if}
{:else}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			class={cn([
				'hover:bg-accent active:bg-accent h-fit px-1 py-2',
				isActive ? 'bg-secondary' : ''
			])}
		>
			{#snippet child({ props })}
				<a
					href={url}
					style={`padding-left: ${0.5 + depth * 0.6}rem`}
					{...props}
					class={`${props.class} flex flex-row items-center justify-between`}
				>
					<span
						class="grow overflow-hidden text-ellipsis whitespace-nowrap"
						>{id}</span
					>
					{#if nameForExtension !== undefined}
						<Badge class="bg-muted text-muted-foreground">
							{nameForExtension}
						</Badge>
					{/if}
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/if}
