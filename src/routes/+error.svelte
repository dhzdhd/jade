<script lang="ts">
	import { page } from '$app/state';
</script>

<div
	class="flex h-screen w-screen flex-col items-center justify-center space-y-3"
>
	<h1 class="text-accent text-7xl font-bold">{page.status}</h1>
	<h2 class="text-3xl">{page.error?.message}</h2>
</div>
