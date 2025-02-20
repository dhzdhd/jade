<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import PanelLeft from 'lucide-svelte/icons/panel-left';

	interface TOCSidebarProps {
		headings: {
			level: number;
			text: string;
			url: string;
		}[];
	}

	const { headings }: TOCSidebarProps = $props();
</script>

<Sidebar.Root collapsible="offcanvas" side="right" class="fixed top-0 right-0">
	<Sidebar.Content class="bg-background w-52 max-w-52 pt-16">
		<Sidebar.Group>
			<Sidebar.GroupLabel>Table Of Contents</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each headings as heading}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								class="hover:bg-accent active:bg-accent flex flex-row justify-between py-5"
							>
								{#snippet child({ props })}
									<a href={heading.url} {...props} style={`padding-left: ${heading.level * 1}rem`}>
										<span>{heading.text}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Trigger side="right" class="fixed right-[1rem] bottom-[1rem]">
			<PanelLeft></PanelLeft>
		</Sidebar.Trigger>
	</Sidebar.Content>
</Sidebar.Root>
