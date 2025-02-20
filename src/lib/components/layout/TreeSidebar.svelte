<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import TreeNode from './TreeNode.svelte';
	import type { TreeItem } from '$lib';

	interface TreeSidebarProps {
		files: string[];
	}

	const { files }: TreeSidebarProps = $props();
	const fileTree = getFileTree(files);

	function getFileTree(files: string[]): TreeItem[] {
		const tree: TreeItem[] = [];

		for (const file of files) {
			const segments = file.split('/');
			let currentLevel = tree;
			let idx = 0;

			for (const segment of segments) {
				let existingNode = currentLevel.find((node) => node.id === segment);
				if (!existingNode) {
					existingNode = { id: segment, children: [], depth: idx, url: `/${file}` };
					currentLevel.push(existingNode);
				}
				currentLevel = existingNode.children;
				idx += 1;
			}
		}

		return tree;
	}
</script>

<Sidebar.Root collapsible="offcanvas">
	<Sidebar.Content class="bg-background w-52 max-w-52 pt-8">
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="pt-10">
					{#each fileTree as item (item.id)}
						<TreeNode id={item.id} children={item.children!} depth={item.depth} url={item.url} />
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Trigger side="left" class="fixed bottom-[1rem] left-[1rem]" />
	</Sidebar.Content>
</Sidebar.Root>
