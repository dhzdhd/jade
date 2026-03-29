<script lang="ts">
	import TreeNode from './TreeNode.svelte';
	import type { TreeItem } from '$lib';

	interface TreeSidebarProps {
		files: string[];
	}

	const { files }: TreeSidebarProps = $props();
	const fileTree = $derived(getFileTree(files));

	function getFileTree(files: string[]): TreeItem[] {
		const tree: TreeItem[] = [];

		for (const file of files) {
			const segments = file.split('/');
			let currentLevel = tree;
			let idx = 0;
			let path = '';

			for (const segment of segments) {
				path = path ? `${path}/${segment}` : segment;
				let existingNode = currentLevel.find(
					(node) => node.id === segment
				);
				if (!existingNode) {
					existingNode = {
						id: segment,
						children: [],
						depth: idx,
						url: `/${path}`
					};
					currentLevel.push(existingNode);
				}
				currentLevel = existingNode.children;
				idx += 1;
			}
		}

		return tree;
	}
</script>

{#each fileTree as item (item.id)}
	<TreeNode
		id={item.id}
		children={item.children!}
		depth={item.depth}
		url={item.url}
	/>
{/each}
