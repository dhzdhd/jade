<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { slug: string; data: string };

	let { data }: Props = $props();
	let canvasUrl = $state('');

	onMount(async () => {
		const excLib = await import('@excalidraw/excalidraw');

		const execPromise = async () => {
			const content = await excLib.loadFromBlob(
				new Blob([data], { type: 'application/json' }),
				null,
				null
			);

			const canvas = await excLib.exportToCanvas({
				elements: content.elements,
				appState: {
					...content.appState,
					exportWithDarkMode: true
				},
				files: content.files
			});
			canvasUrl = canvas.toDataURL();
		};
		execPromise();
	});
</script>

<div class="export export-canvas w-full">
	<img class="w-full" src={canvasUrl} alt="Excalidraw canvas" />
</div>
