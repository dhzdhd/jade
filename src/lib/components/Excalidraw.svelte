<script lang="ts">
	import { exportToCanvas, loadFromBlob } from '@excalidraw/excalidraw';
	import { untrack } from 'svelte';

	type Props = { slug: string; data: string };

	let { slug, data }: Props = $props();
	let canvasUrl = $state('');

	$effect(() => {
		const execPromise = async () => {
			const content = await loadFromBlob(
				new Blob([data], { type: 'application/json' }),
				null,
				null
			);

			const canvas = await exportToCanvas({
				elements: content.elements,
				appState: {
					...content.appState,
					exportWithDarkMode: true
				},
				files: content.files
			});
			canvasUrl = untrack(() => canvas.toDataURL());
		};
		execPromise();
	});
</script>

<div class="export export-canvas w-full">
	<img class="w-full" src={canvasUrl} alt="Excalidraw canvas" />
</div>
