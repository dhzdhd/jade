<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import Header from '$lib/components/layout/Header.svelte';

	let { children, data }: LayoutProps = $props();
	console.log(data);
</script>

<ModeWatcher />
<Header config={data.config} />
{@render children()}
