<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';
	import Header from '$lib/components/layout/Header.svelte';

	let { children, data }: { children: Snippet<[]>; data: LayoutServerData } = $props();
	console.log(data);
</script>

<ModeWatcher />
<Header />
{@render children()}
