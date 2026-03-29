<script lang="ts">
	import type { Bases } from '$lib/post';

	interface BaseLayoutProps {
		data: Bases;
	}

	const { data }: BaseLayoutProps = $props();

	const fileProperties = $derived(data.fileProperties);
</script>

<div>
	{#each fileProperties as property}
		<div>{property.ext}</div>
	{/each}
</div>
