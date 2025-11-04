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
	<li class="m-0 p-0">
		<Button
			variant="ghost"
			class="flex h-fit w-full flex-row justify-between overflow-clip p-0 text-left"
		>
			<a
				href={heading.url}
				style={`padding-left: ${heading.level - 0.5 * 1}rem`}
				class="w-full px-1 py-2"
			>
				<span class="text-left text-wrap">{heading.text}</span>
			</a>
		</Button>
	</li>
{/each}
