<script lang="ts">
	import { cn } from '$lib/utils';
	import { onClickOutside, PersistedState } from 'runed';
	import Button from '../ui/button/button.svelte';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getSettings } from '$lib/state/settings.svelte';
	import PanelRight from 'lucide-svelte/icons/panel-right';

	interface SidebarProps {
		storageKey: 'treeOpen' | 'tocOpen';
		side: 'left' | 'right';
		children: Snippet;
	}

	let { storageKey, side, children }: SidebarProps = $props();

	const settings = getSettings();
	let sidebarVisibility = $derived(
		storageKey === 'treeOpen'
			? settings.current.treeVisibility
			: settings.current.tocVisibility
	);

	const closed = new PersistedState(storageKey, true);
	let container = $state<HTMLElement>()!;
	onClickOutside(
		() => container,
		() => false
		// TODO:
		// () => (closed.current = true)
	);
</script>

<div bind:this={container}>
	<aside
		in:fly={{ x: -200, duration: 200 }}
		class={cn([
			closed.current
				? side === 'left'
					? '-translate-x-52'
					: 'translate-x-52'
				: 'translate-x-0',
			side === 'left' ? 'left-0' : 'right-0',
			settings.current.isHeaderVisible ? 'py-20' : 'py-2',
			'bg-background fixed bottom-0 h-screen w-52 max-w-52 list-none overflow-x-clip overflow-y-auto px-2 transition'
		])}
	>
		<ul class="flex flex-col gap-1">
			{@render children()}
		</ul>
	</aside>
</div>
<Button
	onclick={() => (closed.current = !closed.current)}
	variant="ghost"
	size="icon"
	class={cn([
		sidebarVisibility.isButtonVisible ? 'flex' : 'hidden',
		side === 'left' ? 'left-4' : 'right-4',
		'fixed bottom-4'
	])}
	aria-label={storageKey === 'treeOpen'
		? 'Toggle file tree button'
		: 'Toggle table of contents button'}
>
	{#if side == 'left'}
		<PanelLeft />
	{:else}
		<PanelRight />
	{/if}
</Button>
