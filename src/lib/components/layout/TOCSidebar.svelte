<script lang="ts">
	import Button from '../ui/button/button.svelte';

	interface TOCSidebarProps {
		headings: {
			level: number;
			text: string;
			url: string;
		}[];
	}

	const { headings }: TOCSidebarProps = $props();
</script>

{#each headings as heading}
	<Button
		class="hover:bg-accent active:bg-accent bg-background text-foreground flex w-full flex-row justify-between overflow-clip px-0 py-5 text-left"
	>
		<a href={heading.url} style={`padding-left: ${heading.level - 0.5 * 1}rem`}>
			<span class="text-left text-wrap">{heading.text}</span>
		</a>
	</Button>
{/each}
