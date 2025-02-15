<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import Header from '$lib/components/layout/Header.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<ModeWatcher />
<Header config={data.config} />
<main class="flex w-screen justify-center">
	{@render children()}
</main>
