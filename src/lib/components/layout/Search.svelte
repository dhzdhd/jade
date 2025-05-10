<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PostAndHeadingData } from '$lib';
	import * as Command from '$lib/components/ui/command/index.js';
	import Button from '../ui/button/button.svelte';
	import Search from 'lucide-svelte/icons/search';

	interface Props {
		postsAndHeadings: PostAndHeadingData[];
	}

	const { postsAndHeadings }: Props = $props();
	let open = $state(false);

	const handleSelect = async (url: string) => {
		open = false;
		await goto(url);
	};
</script>

<Button onclick={() => (open = true)} size="icon" variant="outline">
	<Search />
</Button>
<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			{#each postsAndHeadings as suggestion}
				<Command.Item value={suggestion.title} onSelect={async () => handleSelect(suggestion.url)}>
					{suggestion.title}
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
