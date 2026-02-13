<script lang="ts">
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { id, data }: NodeProps = $props();
</script>

<div class="markdown-node rounded-3xl">
	<div>
		<label for="text">{data.content}</label>
	</div>
</div>
<Handle type="target" position={Position.Top} id="top" />
<Handle type="target" position={Position.Left} id="left" />
<Handle type="target" position={Position.Right} id="right" />
<Handle type="target" position={Position.Bottom} id="bottom" />
<Handle type="source" position={Position.Top} id="top" />
<Handle type="source" position={Position.Left} id="left" />
<Handle type="source" position={Position.Right} id="right" />
<Handle type="source" position={Position.Bottom} id="bottom" />
