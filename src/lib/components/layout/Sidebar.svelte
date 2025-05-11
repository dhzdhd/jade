<script lang="ts">
	import { cn } from '$lib/utils';
	import { PersistedState } from 'runed';
	import Button from '../ui/button/button.svelte';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getSettings } from '$lib/state/settings.svelte';

	interface SidebarProps {
		storageKey: 'treeOpen' | 'tocOpen';
		side: 'left' | 'right';
		children: Snippet;
	}

	let { storageKey, side, children }: SidebarProps = $props();

	const settings = getSettings();
	let sidebarVisibility = $derived(
		storageKey === 'treeOpen' ? settings.current.treeVisibility : settings.current.tocVisibility
	);

	let container = $state<HTMLElement>()!;
	// onClickOutside(
	// 	() => container,
	// 	() => (open.current = false)
	// );

	const open = new PersistedState(storageKey, true);
</script>

<div bind:this={container}>
	<aside
		in:fly={{ x: -200, duration: 200 }}
		class={cn([
			open.current ? (side === 'left' ? '-translate-x-52' : 'translate-x-52') : 'translate-x-0',
			side === 'left' ? 'left-0' : 'right-0',
			'bg-background fixed bottom-0 h-screen w-52 max-w-52 list-none overflow-x-clip overflow-y-auto px-2 py-20 transition'
		])}
	>
		{@render children()}
	</aside>
</div>
<Button
	onclick={() => (open.current = !open.current)}
	variant="ghost"
	size="icon"
	class={cn([
		sidebarVisibility.isButtonVisible ? 'flex' : 'hidden',
		side === 'left' ? 'left-[1rem]' : 'right-[1rem]',
		'fixed bottom-[1rem]'
	])}
>
	<PanelLeft />
</Button>
