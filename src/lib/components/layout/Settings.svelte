<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '../ui/button';
	import Settings from 'lucide-svelte/icons/settings';
	import { Switch } from '../ui/switch';
	import { Label } from '../ui/label';
	import {
		getSettings,
		toggleHeaderVisibility,
		toggleLowContrast,
		toggleTOCVisibility,
		toggleTreeVisibility
	} from '$lib/state/settings.svelte';
	import { PressedKeys } from 'runed';
	import { untrack } from 'svelte';

	let open = $state(false);
	const settings = getSettings();

	const keys = new PressedKeys();
	const isCtrlAPressed = $derived(keys.has('Alt', 's'));
	$effect(() => {
		if (isCtrlAPressed) {
			open = untrack(() => !open);
		}
	});
</script>

<Dialog.Root bind:open>
	<Button onclick={() => (open = true)} size="icon" variant="outline">
		<Settings />
	</Button>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-2xl">Settings</Dialog.Title>
			<Dialog.Description>
				All the website settings are stored in your browser. You can change them at any time. Press <kbd
					>s</kbd
				> to open the settings.
			</Dialog.Description>
		</Dialog.Header>
		<h3 class="mt-2 text-lg font-medium">File tree</h3>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide file tree sidebar</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the file tree sidebar on the left side of the page.
				</span>
			</Label>
			<Switch
				checked={!settings.current.treeVisibility.isSidebarVisible}
				onCheckedChange={(val) => toggleTreeVisibility({ isSidebarVisible: !val })}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide file tree button</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the file tree button on the bottom left side of the page.
				</span>
			</Label>
			<Switch
				checked={!settings.current.treeVisibility.isButtonVisible}
				onCheckedChange={(val) => toggleTreeVisibility({ isButtonVisible: !val })}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<h3 class="mt-2 text-lg font-medium">Table of Contents</h3>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide table of contents sidebar</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the table of contents sidebar on the right side of the page.
				</span>
			</Label>
			<Switch
				checked={!settings.current.tocVisibility.isSidebarVisible}
				onCheckedChange={(val) => toggleTOCVisibility({ isSidebarVisible: !val })}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide table of contents button</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the table of contents button on the bottom right side of the page.
				</span>
			</Label>
			<Switch
				checked={!settings.current.tocVisibility.isButtonVisible}
				onCheckedChange={(val) => toggleTOCVisibility({ isButtonVisible: !val })}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<h3 class="mt-2 text-lg font-medium">Page navigation</h3>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide breadcrumb navigation</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the breadcrumb navigation at the top of the page.
				</span>
			</Label>
			<Switch
				checked={settings.current.isLowContrast}
				onCheckedChange={(val) => toggleLowContrast(val)}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide bottom navigation buttons</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the two navigation buttons at the bottom of the page.
				</span>
			</Label>
			<Switch
				checked={settings.current.isLowContrast}
				onCheckedChange={(val) => toggleLowContrast(val)}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<h3 class="mt-2 text-lg font-medium">Misc</h3>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Low contrast</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Mutes the colors of the website to make it easier on the eyes. This is a work in progress.
				</span>
			</Label>
			<Switch
				checked={settings.current.isLowContrast}
				onCheckedChange={(val) => toggleLowContrast(val)}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Hide header</span>
				<span class="text-muted-foreground text-xs leading-snug font-normal">
					Hides the top header which includes the title and all the buttons, including the settings.
					Access the settings by pressing <kbd>Ctrl ,</kbd>
				</span>
			</Label>
			<Switch
				checked={!settings.current.isHeaderVisible}
				onCheckedChange={(val) => toggleHeaderVisibility(!val)}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
