<script lang="ts">
	import { getSanitizedPath } from '$lib';
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { data }: NodeProps = $props();
	$inspect(data);
</script>

{#if data.type === 'text'}
	<div class="markdown-node h-full w-full rounded-3xl">
		<span class=" px-3 text-2xl">{data.content}</span>
	</div>
{:else}
	<div class="markdown-node h-full rounded-3xl p-0.5">
		<iframe
			class="h-full w-full rounded-3xl"
			title="hi"
			src={`/iframe_embed/${getSanitizedPath(data.content.toString())}`}
		>
		</iframe>
	</div>
{/if}
<Handle type="target" position={Position.Top} id="top" />
<Handle type="target" position={Position.Left} id="left" />
<Handle type="target" position={Position.Right} id="right" />
<Handle type="target" position={Position.Bottom} id="bottom" />
<Handle type="source" position={Position.Top} id="top" />
<Handle type="source" position={Position.Left} id="left" />
<Handle type="source" position={Position.Right} id="right" />
<Handle type="source" position={Position.Bottom} id="bottom" />
