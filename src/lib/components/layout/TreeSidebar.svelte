<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Tree } from 'melt/builders';
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

	// const tree = new Tree({ items: fileTree });

	$inspect(fileTree);
</script>

<Sidebar.Root collapsible="offcanvas">
	<Sidebar.Content class="bg-background w-52 max-w-52">
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="pt-10">
					{#each fileTree as item (item.id)}
						<!-- <Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem> -->
						<TreeNode id={item.id} children={item.children!} depth={item.depth} url={item.url} />
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Trigger side="left" class="text-accent fixed bottom-[1rem] left-[1rem]" />
	</Sidebar.Content>
</Sidebar.Root>
