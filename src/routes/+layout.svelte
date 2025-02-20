<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import TOCSidebar from '$lib/components/layout/TOCSidebar.svelte';
	import TreeSidebar from '$lib/components/layout/TreeSidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<ModeWatcher />
<Header config={data.config} />
<Sidebar.Provider class="max-h-0 max-w-0">
	<TreeSidebar files={data.files} />
	<Sidebar.Inset>
		<main class="flex w-screen justify-center">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
<!-- Fixed because it takes unnecessary space -->
