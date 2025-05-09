<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '../ui/button';
	import Settings from 'lucide-svelte/icons/settings';
	import { Switch } from '../ui/switch';
	import { Label } from '../ui/label';
	import {
		toggleHeaderVisibility,
		toggleLowContrast,
		toggleTOCVisibility,
		toggleTreeVisibility
	} from '$lib/state/settings.svelte';

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Button onclick={() => (open = true)} size="icon" variant="outline">
		<Settings />
	</Button>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-2xl">Settings</Dialog.Title>
			<Dialog.Description>
				All the website settings are stored in your browser. You can change them at any time.
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
				onCheckedChange={(val) => toggleTreeVisibility({ isSidebarVisible: !val })}
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
				onCheckedChange={(val) => toggleTOCVisibility({ isButtonVisible: !val })}
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
				onCheckedChange={(val) => toggleHeaderVisibility(!val)}
				id="necessary"
				aria-label="Necessary"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
