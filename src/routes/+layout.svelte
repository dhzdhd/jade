<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: Snippet<[]>; data: LayoutServerData } = $props();
	console.log(data);
</script>

{@render children()}
